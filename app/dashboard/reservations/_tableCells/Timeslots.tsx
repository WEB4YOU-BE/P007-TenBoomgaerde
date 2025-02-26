"use client";

import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
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

    return !(isPendingStartHour || isPendingEndHour) ? (
        `${start_hour?.[0].start_hour}${start_hour?.[0].start_hour === end_hour?.[0].end_hour ? "" : " tot " + end_hour?.[0].end_hour}`
    ) : (
        <SpinnerBall className="size-4 animate-spin" />
    );
};

export default TimeslotsCell;
