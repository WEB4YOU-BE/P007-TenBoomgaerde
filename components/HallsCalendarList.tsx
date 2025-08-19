"use client";

import { useQuery } from "@tanstack/react-query";
import { endOfToday, isBefore } from "date-fns";
import { nlBE } from "date-fns/locale";
import React, { useMemo } from "react";

import Calendar from "@/components/atoms/Calendar";
import getHalls, { type GetHallsResponse } from "@/service/halls/getHalls";
import {
    createGetDayStatus,
    DAY_STATUS,
} from "@/service/reservations/createGetDayStatus";
import getReservations, {
    type GetReservationsResponse,
} from "@/service/reservations/getReservations";
import getTimeslots, {
    type GetTimeslotsResponse,
} from "@/service/timeslots/getTimeslots";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

const LegendItem = ({
    dotClass,
    label,
}: {
    dotClass: string;
    label: string;
}) => (
    <span className="inline-flex items-center gap-2">
        <span aria-hidden className={cn("h-2 w-2 rounded-full", dotClass)} />
        <span>{label}</span>
    </span>
);

const HallsCalendarList: React.FC = () => {
    const { data: halls, isLoading: isLoadingHalls } = useQuery({
        queryFn: getHalls,
        queryKey: ["halls"],
    });
    const { data: timeslots, isLoading: isLoadingTimeslots } = useQuery({
        queryFn: getTimeslots,
        queryKey: ["timeslots"],
    });
    const { data: reservations, isLoading: isLoadingReservations } = useQuery({
        queryFn: getReservations,
        queryKey: ["reservations"],
    });

    const isLoading = useMemo(
        () => isLoadingHalls || isLoadingTimeslots || isLoadingReservations,
        [isLoadingHalls, isLoadingTimeslots, isLoadingReservations]
    );

    // Style classes for availability states
    const modifiersClassNames = useMemo(
        () => ({
            AVAILABLE: buttonVariants({
                className: "text-green-600",
                size: "icon",
                variant: "outline",
            }),
            FULLY_BOOKED: "text-red-600",
            PARTIALLY_BOOKED: buttonVariants({
                className: "text-yellow-600",
                size: "icon",
                variant: "secondary",
            }),
        }),
        []
    );

    // Helper to check if a date is strictly before today (includes today)
    const isBeforeToday = (date: Date) => isBefore(date, endOfToday());

    if (isLoading) {
        return (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i}>
                        <div className="h-5 w-48 animate-pulse rounded bg-muted" />
                        <div className="mt-4 h-[300px] animate-pulse rounded border bg-muted/40" />
                    </div>
                ))}
            </div>
        );
    }

    if (!halls?.length || !timeslots?.length) return null;

    return (
        <section
            aria-label="Beschikbaarheid per zaal"
            className="not-first:mt-6"
        >
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Beschikbaarheid
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
                Bekijk per zaal op welke dagen er nog beschikbaarheid is.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <LegendItem dotClass="bg-green-600" label="Beschikbaar" />
                <LegendItem
                    dotClass="bg-yellow-600"
                    label="Gedeeltelijk bezet"
                />
                <LegendItem dotClass="bg-red-600" label="Volgeboekt" />
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {halls.map((hall, idx) => {
                    const hallId = hall.id ?? String(idx);
                    const hallName = hall.name ?? "Zaal";

                    // Build a day status resolver for this hall (no hooks inside loop)
                    const dayStatusForHall = createGetDayStatus({
                        halls: [
                            hall as unknown as NonNullable<GetHallsResponse>[number],
                        ],
                        onlyFullDays: false,
                        onlyWeekend: false,
                        reservations: (reservations ??
                            []) as unknown as NonNullable<GetReservationsResponse>,
                        timeslots: (timeslots ??
                            []) as unknown as NonNullable<GetTimeslotsResponse>,
                    });

                    const modifiers = {
                        AVAILABLE: (date: Date) =>
                            !isBeforeToday(date) &&
                            dayStatusForHall({ date }) === DAY_STATUS.AVAILABLE,
                        FULLY_BOOKED: (date: Date) =>
                            isBeforeToday(date) ||
                            dayStatusForHall({ date }) ===
                                DAY_STATUS.FULLY_BOOKED,
                        PARTIALLY_BOOKED: (date: Date) =>
                            !isBeforeToday(date) &&
                            dayStatusForHall({ date }) ===
                                DAY_STATUS.PARTIALLY_BOOKED,
                    } as const;

                    return (
                        <div className="flex flex-col gap-2" key={hallId}>
                            <h3 className="text-xl font-semibold tracking-tight">
                                {hallName}
                            </h3>
                            <Calendar
                                className="w-full rounded-lg border"
                                defaultMonth={new Date()}
                                disabled={(date) => isBeforeToday(date)}
                                locale={nlBE}
                                modifiers={modifiers}
                                modifiersClassNames={modifiersClassNames}
                                numberOfMonths={2}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default HallsCalendarList;
