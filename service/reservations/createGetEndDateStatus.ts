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
import { addDays, isSameDay, isWeekend, startOfDay } from "date-fns";

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

    // Filter and map reservations to date ranges for the selected halls (exclude declined)
    const reservationRanges = reservations
        .filter((reservation) => {
            if (reservation.status === "DECLINED") return false;
            return reservation.reservations_halls.some((rh) =>
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                hallIds.has(rh.hall?.id)
            );
        })
        .map((r) => ({
            end: new Date(r.end ?? ""),
            start: new Date(r.start ?? ""),
        }))
        .filter((r) => !isNaN(r.start.getTime()) && !isNaN(r.end.getTime()))
        .sort((a, b) => a.start.getTime() - b.start.getTime());

    // Helper: build ranges for an arbitrary base date (handles overnight)
    const buildRangesForDate = (baseDate: Date) =>
        timeslots.map((ts) => {
            const start = buildDateAtTime(baseDate, ts.start_time);
            const endCandidate = buildDateAtTime(baseDate, ts.end_time);
            const end =
                endCandidate <= start ? addDays(endCandidate, 1) : endCandidate;
            return { end, start };
        });

    // Determine the start's owning timeslot day (consider overnight via previous day)
    const startDay = startOfDay(startDateTime);
    const startDayRanges = buildRangesForDate(startDay);
    const prevDay = addDays(startDay, -1);
    const prevDayRanges = buildRangesForDate(prevDay);

    const findActiveContainingStart = (ranges: { end: Date; start: Date }[]) =>
        ranges.find((r) => startDateTime >= r.start && startDateTime < r.end);

    let owningStartDay = startDay;
    const activeStartRange =
        findActiveContainingStart(startDayRanges) ??
        ((owningStartDay = prevDay),
        findActiveContainingStart(prevDayRanges) ?? null);

    const startInsideAnyTimeslot = Boolean(activeStartRange);

    // Precompute reservation interactions relative to the start
    const overlapsStart = reservationRanges.some(
        (res) => res.start <= startDateTime && res.end > startDateTime
    );
    const nextBlocker = reservationRanges.find(
        (res) => res.start > startDateTime
    );

    return ({ date }) => {
        // Weekend-only enforcement
        if (onlyWeekend && !isWeekend(date)) return DAY_STATUS.FULLY_BOOKED;
        // No configured timeslots at all
        if (!timeslots.length) return DAY_STATUS.FULLY_BOOKED;
        // Start must be valid inside some timeslot (considering overnight ownership)
        if (!startInsideAnyTimeslot) return DAY_STATUS.FULLY_BOOKED;
        // If a reservation overlaps the start, everything is invalid
        if (overlapsStart) return DAY_STATUS.FULLY_BOOKED;

        // Build the day's overall window [minStart, maxEnd]
        const dayRanges = buildRangesForDate(date);
        const windowStartRaw = new Date(
            Math.min(...dayRanges.map((r) => r.start.getTime()))
        );
        const windowEndRaw = new Date(
            Math.max(...dayRanges.map((r) => r.end.getTime()))
        );

        // If the day window ends before the start, cannot end here
        if (windowEndRaw <= startDateTime) return DAY_STATUS.FULLY_BOOKED;

        // On the owning start day, the window is restricted to the active range end and starts at the startDateTime
        const isOwningStartDay =
            activeStartRange && isSameDay(date, owningStartDay);
        const windowStart = isOwningStartDay ? startDateTime : windowStartRaw;
        const windowEnd = isOwningStartDay
            ? (activeStartRange as { end: Date }).end
            : windowEndRaw;

        // If there is a future reservation that starts after the selected start, classify relative to this day's window
        if (nextBlocker) {
            // If the blocker begins before or at this day's window start, you can't reach this day
            if (nextBlocker.start <= windowStart)
                return DAY_STATUS.FULLY_BOOKED;
            // If the blocker begins within this day's window:
            // - when onlyFullDays: it's not allowed (treat as fully booked)
            // - otherwise: it's partially available
            if (nextBlocker.start <= windowEnd)
                return onlyFullDays
                    ? DAY_STATUS.FULLY_BOOKED
                    : DAY_STATUS.PARTIALLY_BOOKED;
        }

        // Otherwise this day is available to select as an end date
        return DAY_STATUS.AVAILABLE;
    };
};

export default createGetEndDateStatus;
