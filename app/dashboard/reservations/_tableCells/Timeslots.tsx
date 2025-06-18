"use client";

import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getTimeslotById } from "./actions";

interface TimeslotsCellProps {
    endHourID: string;
    startHourID: string;
}
const TimeslotsCell = ({ endHourID, startHourID }: TimeslotsCellProps) => {
    const { data: start_hour, isPending: isPendingStartHour } = useQuery({
        networkMode: "online",
        queryFn: () => getTimeslotById(startHourID),
        queryKey: ["timeslot", startHourID],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const { data: end_hour, isPending: isPendingEndHour } = useQuery({
        networkMode: "online",
        queryFn: () => getTimeslotById(endHourID),
        queryKey: ["timeslot", endHourID],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    if (isPendingStartHour || isPendingEndHour) {
        return <SpinnerBallIcon className="size-4 animate-spin" />;
    }

    const start =
        start_hour && Array.isArray(start_hour) && start_hour.length > 0
            ? start_hour[0].start_hour
            : "";
    const end =
        end_hour && Array.isArray(end_hour) && end_hour.length > 0
            ? end_hour[0].end_hour
            : "";

    if (!start && !end) {
        return null;
    }

    return (
        <>
            {start}
            {start === end || !end ? "" : " tot " + end}
        </>
    );
};

export default TimeslotsCell;
