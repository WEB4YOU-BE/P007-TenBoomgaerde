/**
 * Build a day-availability resolver.
 *
 * Determines if a date is AVAILABLE, PARTIALLY_BOOKED, or FULLY_BOOKED
 * based on halls, reservations, and timeslots.
 *
 * Rules:
 * - onlyWeekend: weekdays are treated as FULLY_BOOKED.
 * - onlyFullDays: merge all timeslots into one range [earliest start, latest end].
 * - Overnight timeslots (end < start) roll over to the next day.
 *
 * Returns a function that accepts a Date and yields a DAY_STATUS.
 */
import { addDays, areIntervalsOverlapping, isWeekend } from "date-fns";

import { GetHallsResponse } from "@/service/halls/getHalls";
import { GetReservationsResponse } from "@/service/reservations/getReservations";
import { GetTimeslotsResponse } from "@/service/timeslots/getTimeslots";

export enum DAY_STATUS {
    AVAILABLE = "AVAILABLE",
    FULLY_BOOKED = "FULLY_BOOKED",
    PARTIALLY_BOOKED = "PARTIALLY_BOOKED",
}
export type GetDayStatus = (props: GetDayStatusProps) => DAY_STATUS;
/**
 * Options for createGetDayStatus.
 * - halls: Halls to consider.
 * - reservations: All reservations; filtered by selected halls.
 * - timeslots: Daily slots (HH:mm:ss). Overnight supported.
 * - onlyWeekend: If true, block weekdays.
 * - onlyFullDays: If true, use the union of all timeslots as one range.
 */
export interface GetDayStatusOptions {
    halls: NonNullable<GetHallsResponse>;
    onlyFullDays?: boolean;
    onlyWeekend?: boolean;
    reservations: NonNullable<GetReservationsResponse>;
    timeslots: NonNullable<GetTimeslotsResponse>;
}
export interface GetDayStatusProps {
    date: Date;
}
/**
 * Create a function that returns a DAY_STATUS for a given date.
 * @param options See GetDayStatusOptions.
 * @returns (props: { date: Date }) => DAY_STATUS
 */
export const createGetDayStatus = ({
    halls,
    onlyFullDays = false,
    onlyWeekend = false,
    reservations,
    timeslots,
}: GetDayStatusOptions): GetDayStatus => {
    // Precompute hall IDs once
    const hallIds = new Set(halls.map((h) => h.id));

    // Precompute valid reservations for the selected halls
    const reservationRanges = reservations
        .filter((reservation) =>
            reservation.reservations_halls.some((reservationHall) =>
                hallIds.has(reservationHall.hall?.id)
            )
        )
        .map((reservation) => ({
            end: new Date(reservation.end || ""),
            start: new Date(reservation.start || ""),
        }))
        .filter((r) => !isNaN(r.start.getTime()) && !isNaN(r.end.getTime()));

    // Helper: turn a base date and a HH:mm[:ss] string into a Date
    const buildDateAtTime = (base: Date, time: string) => {
        const [h = "0", m = "0", s = "0"] = time.split(":");
        const d = new Date(base);
        d.setHours(Number(h) || 0, Number(m) || 0, Number(s) || 0, 0);
        return d;
    };

    return ({ date }) => {
        // Enforce weekend-only bookings if requested (block weekdays)
        if (onlyWeekend && !isWeekend(date)) return DAY_STATUS.FULLY_BOOKED;

        // Construct date-specific timeslot ranges
        const timeslotRanges = timeslots.map((ts) => {
            const start = buildDateAtTime(date, ts.start_time);
            const endCandidate = buildDateAtTime(date, ts.end_time);
            const end =
                endCandidate <= start ? addDays(endCandidate, 1) : endCandidate;
            return { end, start };
        });

        if (timeslotRanges.length === 0) return DAY_STATUS.FULLY_BOOKED;
        if (reservationRanges.length === 0) return DAY_STATUS.AVAILABLE;

        // When onlyFullDays is true, merge all timeslots into a single range
        const activeRanges = onlyFullDays
            ? [
                  {
                      end: new Date(
                          Math.max(
                              ...timeslotRanges.map((r) => r.end.getTime())
                          )
                      ),
                      start: new Date(
                          Math.min(
                              ...timeslotRanges.map((r) => r.start.getTime())
                          )
                      ),
                  },
              ]
            : timeslotRanges;

        // Check availability using precomputed reservations
        const overlaps = activeRanges.map((timeslotRange) =>
            reservationRanges.some((reservationRange) =>
                areIntervalsOverlapping(timeslotRange, reservationRange)
            )
        );

        const isFullyBooked = overlaps.every(Boolean);
        const isPartiallyBooked = overlaps.some(Boolean);

        if (isFullyBooked) return DAY_STATUS.FULLY_BOOKED;
        if (isPartiallyBooked) return DAY_STATUS.PARTIALLY_BOOKED;
        return DAY_STATUS.AVAILABLE;
    };
};
