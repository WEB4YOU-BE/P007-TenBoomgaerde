/**
 * Build a day-timeslot resolver.
 *
 * Given halls, reservations and daily timeslots, returns for a specific date
 * the list of timeslot IDs that can be selected as a start.
 *
 * Rules mirror createGetDayStatus:
 * - onlyWeekend: weekdays are treated as unavailable (returns []).
 * - Overnight timeslots (end < start) roll over to the next day.
 * - A timeslot is available if its [start,end) interval for that date does NOT
 *   overlap any reservation interval for the selected halls.
 */
import { addDays, areIntervalsOverlapping, isWeekend } from "date-fns";

import type { GetHallsResponse } from "@/service/halls/getHalls";
import type { GetReservationsResponse } from "@/service/reservations/getReservations";
import type { GetTimeslotsResponse } from "@/service/timeslots/getTimeslots";

type GetDayTimeslotIds = (props: { date: Date }) => string[];

interface GetDayTimeslotIdsOptions {
    halls: NonNullable<GetHallsResponse>;
    onlyWeekend?: boolean;
    reservations: NonNullable<GetReservationsResponse>;
    timeslots: NonNullable<GetTimeslotsResponse>;
}

/**
 * Create a function that returns available start timeslot IDs for a given date.
 */
export const createGetDayTimeslotIds = ({
    halls,
    onlyWeekend = false,
    reservations,
    timeslots,
}: GetDayTimeslotIdsOptions): GetDayTimeslotIds => {
    // Precompute hall id set once
    const hallIds = new Set(halls.map((h) => h.id));

    // Filter reservations to only those affecting the selected halls (excluding declined) and with valid datetimes
    const reservationsFiltered = reservations
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
        .filter((r) => !isNaN(r.start.getTime()) && !isNaN(r.end.getTime()));

    // Helper: turn a base date and a HH:mm[:ss] string into a Date
    const buildDateAtTime = (base: Date, time: string) => {
        const [h = "0", m = "0", s = "0"] = time.split(":");
        const d = new Date(base);
        d.setHours(Number(h) || 0, Number(m) || 0, Number(s) || 0, 0);
        return d;
    };

    return ({ date }) => {
        if (onlyWeekend && !isWeekend(date)) return [];
        if (!timeslots.length) return [];

        // Build timeslot ranges for the provided date
        const ranges = timeslots.map((ts) => {
            const start = buildDateAtTime(date, ts.start_time);
            const endCandidate = buildDateAtTime(date, ts.end_time);
            const end =
                endCandidate < start ? addDays(endCandidate, 1) : endCandidate;
            return { end, id: ts.id, start };
        });

        if (!reservationsFiltered.length)
            return ranges.map((r) => r.id).filter(Boolean);

        // A timeslot is available when it does NOT overlap any reservation
        const availableIds = ranges
            .filter(
                (slot) =>
                    !reservationsFiltered.some((res) =>
                        areIntervalsOverlapping(
                            { end: slot.end, start: slot.start },
                            { end: res.end, start: res.start }
                        )
                    )
            )
            .map((r) => r.id)
            .filter(Boolean);

        return availableIds;
    };
};

export default createGetDayTimeslotIds;
