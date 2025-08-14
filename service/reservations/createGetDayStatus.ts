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

enum DAY_STATUS {
    AVAILABLE = "AVAILABLE",
    FULLY_BOOKED = "FULLY_BOOKED",
    PARTIALLY_BOOKED = "PARTIALLY_BOOKED",
}
type GetDayStatus = (props: GetDayStatusProps) => DAY_STATUS;
/**
 * Options for createGetDayStatus.
 * - halls: Halls to consider.
 * - reservations: All reservations; filtered by selected halls.
 * - timeslots: Daily slots (HH:mm:ss). Overnight supported.
 * - onlyWeekend: If true, block weekdays.
 * - onlyFullDays: If true, use the union of all timeslots as one range.
 */
interface GetDayStatusOptions {
    halls: NonNullable<GetHallsResponse>;
    onlyFullDays?: boolean;
    onlyWeekend?: boolean;
    reservations: NonNullable<GetReservationsResponse>;
    timeslots: NonNullable<GetTimeslotsResponse>;
}
interface GetDayStatusProps {
    date: Date;
}
/**
 * Create a function that returns a DAY_STATUS for a given date.
 * @param options See GetDayStatusOptions.
 * @returns (props: { date: Date }) => DAY_STATUS
 */
export const createGetDayStatus =
    ({
        halls,
        onlyFullDays = false,
        onlyWeekend = false,
        reservations,
        timeslots,
    }: GetDayStatusOptions): GetDayStatus =>
    ({ date }) => {
        // Enforce weekend-only bookings if requested (block weekdays)
        if (onlyWeekend && !isWeekend(date)) return DAY_STATUS.FULLY_BOOKED;

        // Timeslot DateTime ranges (supports HH:MM:SS and overnight slots)
        const buildDateAtTime = (base: Date, time: string) => {
            const [h = "0", m = "0", s = "0"] = time.split(":");
            const d = new Date(base);
            d.setHours(Number(h) || 0, Number(m) || 0, Number(s) || 0, 0);
            return d;
        };

        const slotRanges = timeslots.map((ts) => {
            const start = buildDateAtTime(date, ts.start_time);
            const proposedEnd = buildDateAtTime(date, ts.end_time);
            // handle overnight
            const end =
                proposedEnd < start ? addDays(proposedEnd, 1) : proposedEnd;
            return { end, start };
        });

        const timeslotRanges =
            onlyFullDays && slotRanges.length > 0
                ? [
                      {
                          end: new Date(
                              Math.max(
                                  ...slotRanges.map((r) => r.end.getTime())
                              )
                          ),
                          start: new Date(
                              Math.min(
                                  ...slotRanges.map((r) => r.start.getTime())
                              )
                          ),
                      },
                  ]
                : slotRanges;

        if (timeslotRanges.length === 0) return DAY_STATUS.AVAILABLE;

        // Reservation DateTime ranges:
        const hallIds = new Set(halls.map((h) => h.id));
        const reservationsFilteredByHall = reservations.filter((reservation) =>
            reservation.reservations_halls.some((reservationHall) =>
                hallIds.has(reservationHall.hall.id)
            )
        );

        const reservationRanges = reservationsFilteredByHall
            .map((reservation) => ({
                end: new Date(reservation.end || ""),
                start: new Date(reservation.start || ""),
            }))
            .filter(
                (r) => !isNaN(r.start.getTime()) && !isNaN(r.end.getTime())
            );

        if (reservationRanges.length === 0) return DAY_STATUS.AVAILABLE;

        // Check availability (compute overlaps once)
        const overlaps = timeslotRanges.map((timeslotRange) =>
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
