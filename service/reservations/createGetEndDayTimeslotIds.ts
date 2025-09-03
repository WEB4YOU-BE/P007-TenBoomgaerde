/**
 * Build an end-day timeslot resolver.
 *
 * Given halls, reservations, daily timeslots and a fixed start DateTime,
 * returns for a specific end date the list of timeslot IDs that can be
 * selected as an end.
 *
 * Semantics mirror createGetEndDateStatus and createGetDayTimeslotIds:
 * - onlyWeekend: weekdays are treated as unavailable (returns []).
 * - Overnight timeslots (end < start) roll over to the next day.
 * - Start must fall inside an active timeslot; otherwise returns [].
 * - If a reservation overlaps the start, returns [].
 * - A candidate end timeslot is allowed when its end occurs within the day's
 *   active window and strictly after start; it must not be cut by the next
 *   reservation after the start.
 * - If onlyFullDays: end selection must reach the day's window end; if any
 *   reservation blocks before that, no end timeslot is offered for that day.
 */
import { addDays, isSameDay, isWeekend, startOfDay } from "date-fns";

import type { GetHallsResponse } from "@/service/halls/getHalls";
import type { GetReservationsResponse } from "@/service/reservations/getReservations";
import type { GetTimeslotsResponse } from "@/service/timeslots/getTimeslots";

export type GetEndDayTimeslotIds = (props: { date: Date }) => string[];

export interface GetEndDayTimeslotIdsOptions {
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

export const createGetEndDayTimeslotIds = ({
    halls,
    onlyFullDays = false,
    onlyWeekend = false,
    reservations,
    startDateTime,
    timeslots,
}: GetEndDayTimeslotIdsOptions): GetEndDayTimeslotIds => {
    // Precompute hall IDs once
    const hallIds = new Set(halls.map((h) => h.id));

    // Filter and map reservations to date ranges for the selected halls
    const reservationRanges = reservations
        .filter((reservation) =>
            reservation.reservations_halls.some((rh) =>
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                hallIds.has(rh.hall?.id)
            )
        )
        .map((r) => ({
            end: new Date(r.end ?? ""),
            start: new Date(r.start ?? ""),
        }))
        .filter((r) => !isNaN(r.start.getTime()) && !isNaN(r.end.getTime()))
        .sort((a, b) => a.start.getTime() - b.start.getTime());

    if (!timeslots.length) {
        // No configured timeslots at all — nothing can be selected
        return () => [];
    }

    // Helper: build ranges for an arbitrary base date (handles overnight)
    const buildRangesForDate = (baseDate: Date) =>
        timeslots.map((ts) => {
            const start = buildDateAtTime(baseDate, ts.start_time);
            const endCandidate = buildDateAtTime(baseDate, ts.end_time);
            const end =
                endCandidate <= start ? addDays(endCandidate, 1) : endCandidate;
            return { end, id: ts.id, start };
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
        // Weekend-only enforcement for the end date
        if (onlyWeekend && !isWeekend(date)) return [];

        // Start must be valid inside some timeslot (considering overnight ownership)
        if (!startInsideAnyTimeslot) return [];

        // If a reservation overlaps the start, everything is invalid
        if (overlapsStart) return [];

        // Build the day's timeslot ranges
        const dayRanges = buildRangesForDate(date);
        if (!dayRanges.length) return [];

        const windowStartRaw = new Date(
            Math.min(...dayRanges.map((r) => r.start.getTime()))
        );
        const windowEndRaw = new Date(
            Math.max(...dayRanges.map((r) => r.end.getTime()))
        );

        // If the day window ends before or at the start, can't end here
        if (windowEndRaw <= startDateTime) return [];

        // On the owning start day, the window is restricted to the active range end and
        // starts at the startDateTime; otherwise it's the full day window.
        const isOwningStartDay =
            activeStartRange && isSameDay(date, owningStartDay);
        const windowStart = isOwningStartDay ? startDateTime : windowStartRaw;
        const windowEnd = isOwningStartDay
            ? (activeStartRange as { end: Date }).end
            : windowEndRaw;

        // Apply reservation blocker if present
        const hardLimit = nextBlocker ? new Date(nextBlocker.start) : null;

        if (onlyFullDays) {
            // Must reach the day's window end; if a blocker starts before or at windowEnd,
            // the day cannot provide a full end.
            if (hardLimit && hardLimit <= windowEnd) return [];

            // Find timeslot(s) that end exactly at the windowEnd within this day
            const ids = dayRanges
                .filter((r) => r.end.getTime() === windowEnd.getTime())
                .map((r) => r.id)
                .filter(Boolean);
            return ids;
        }

        // Otherwise, allow any timeslot whose end is within the available window and
        // strictly after the windowStart, and not beyond the next reservation start.
        const ids = dayRanges
            .filter((r) => r.end > windowStart && r.end <= windowEnd)
            .filter((r) => (hardLimit ? r.end <= hardLimit : true))
            .map((r) => r.id)
            .filter(Boolean);

        return ids;
    };
};

export default createGetEndDayTimeslotIds;
