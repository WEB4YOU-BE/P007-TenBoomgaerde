"use client";

import { SpinnerBallIcon } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import React, { type FC } from "react";

import type { Tables } from "@/types/supabase/database";

import { getTimeslotById } from "./actions";

interface CurrentStateProps {
    id: string;
    initialData?: Tables<"timeslots">;
}
const CurrentState: FC<CurrentStateProps> = ({
    id,
    initialData,
}: CurrentStateProps) => {
    const {
        data: timeslot,
        isPending,
        isRefetching,
    } = useQuery({
        initialData,
        queryFn: () => getTimeslotById(id),
        queryKey: ["timeslot", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    return (
        <>
            {isPending && <SpinnerBallIcon className="size-4 animate-spin" />}
            {!isPending && !timeslot && <span>Tijdsblok niet gevonden</span>}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Naam</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : (
                        timeslot?.name
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Startuur</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : (
                        timeslot?.start_time
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Einduur</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : (
                        timeslot?.end_time
                    )}
                </span>
            </div>
        </>
    );
};

export default CurrentState;
