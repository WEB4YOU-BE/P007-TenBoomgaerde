/**
 * Build an end-date status resolver.
 *
 * For a given date and a selected start DateTime, report whether the date is
 * AVAILABLE, PARTIALLY_BOOKED, or FULLY_BOOKED with respect to the latest
 * permissible end time computed from halls, reservations, and daily timeslots.
 *
 * Semantics align with createGetEndDate:
 * - onlyWeekend: weekdays are treated as FULLY_BOOKED.
 * - Overnight timeslots (end < start) roll over to the next day.
 * - If onlyFullDays: merge all timeslots into one range [earliest start, latest end].
 * - Start must fall inside an active timeslot; otherwise FULLY_BOOKED.
 * - If a reservation overlaps the start, it's FULLY_BOOKED.
 * - If a reservation after start shortens the end within the active window, it's PARTIALLY_BOOKED.
 * - Otherwise AVAILABLE.
 */
import { addDays, isWeekend } from "date-fns";

import type { GetHallsResponse } from "@/service/halls/getHalls";
import type { GetReservationsResponse } from "@/service/reservations/getReservations";
import type { GetTimeslotsResponse } from "@/service/timeslots/getTimeslots";

import { DAY_STATUS } from "@/service/reservations/createGetDayStatus";

export type GetEndDateStatus = (props: { date: Date }) => DAY_STATUS;

export interface GetEndDateStatusOptions {
    halls: NonNullable<GetHallsResponse>;
    onlyFullDays?: boolean;
    onlyWeekend?: boolean;
    reservations: NonNullable<GetReservationsResponse>;
    startDateTime: Date;
    timeslots: NonNullable<GetTimeslotsResponse>;
}

// Helper: turn a base date and a HH:mm[:ss] string into a Date
const buildDateAtTime = (base: Date, time: string) => {
    const [h = "0", m = "0", s = "0"] = time.split(":");
    const d = new Date(base);
    d.setHours(Number(h) || 0, Number(m) || 0, Number(s) || 0, 0);
    return d;
};

/**
 * Create a function that returns a DAY_STATUS for the end-date availability
 * with respect to a given date and a fixed startDateTime.
 */
export const createGetEndDateStatus = ({
    halls,
    onlyFullDays = false,
    onlyWeekend = false,
    reservations,
    startDateTime,
    timeslots,
}: GetEndDateStatusOptions): GetEndDateStatus => {
    // Precompute hall IDs once
    const hallIds = new Set(halls.map((h) => h.id));

    // Filter and map reservations to date ranges for the selected halls
    const reservationRanges = reservations
        .filter((reservation) =>
            reservation.reservations_halls.some((rh) => hallIds.has(rh.hall.id))
        )
        .map((r) => ({
            end: new Date(r.end || ""),
            start: new Date(r.start || ""),
        }))
        .filter((r) => !isNaN(r.start.getTime()) && !isNaN(r.end.getTime()))
        .sort((a, b) => a.start.getTime() - b.start.getTime());

    return ({ date }) => {
        // Enforce weekend-only bookings if requested (block weekdays)
        if (onlyWeekend && !isWeekend(date)) return DAY_STATUS.FULLY_BOOKED;
        if (!timeslots.length) return DAY_STATUS.FULLY_BOOKED;

        // Build day-specific timeslot ranges
        const ranges = timeslots.map((ts) => {
            const start = buildDateAtTime(date, ts.start_time);
            const endCandidate = buildDateAtTime(date, ts.end_time);
            const end =
                endCandidate <= start ? addDays(endCandidate, 1) : endCandidate;
            return { end, start };
        });

        // Determine the active booking window containing the start
        const activeRanges = onlyFullDays
            ? [
                  {
                      end: new Date(
                          Math.max(...ranges.map((r) => r.end.getTime()))
                      ),
                      start: new Date(
                          Math.min(...ranges.map((r) => r.start.getTime()))
                      ),
                  },
              ]
            : ranges;

        const active = activeRanges.find(
            (r) => startDateTime >= r.start && startDateTime < r.end
        );
        if (!active) return DAY_STATUS.FULLY_BOOKED; // start not inside an allowed range

        // Scan for conflicting reservations relative to the start
        for (const res of reservationRanges) {
            // If there's a reservation already overlapping the start (res.start < start < res.end),
            // the start is invalid and the date is effectively fully booked.
            if (res.start <= startDateTime && res.end > startDateTime) {
                return DAY_STATUS.FULLY_BOOKED;
            }
            // If reservation starts after the selected start and before the end of the active range,
            // it shortens the possible end and thus this day is partially booked.
            if (res.start > startDateTime && res.start <= active.end) {
                return DAY_STATUS.PARTIALLY_BOOKED;
            }
        }

        // No blockers within the active window, so it's available until the window end.
        return DAY_STATUS.AVAILABLE;
    };
};

export default createGetEndDateStatus;
