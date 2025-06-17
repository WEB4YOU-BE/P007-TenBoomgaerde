"use client";

import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import type { Tables } from "@/types/supabase/database";

import { getOrganisationById } from "./actions";

interface Props {
    id: string;
    initialData?: Tables<"organizations">;
}
const CurrentState = ({ id, initialData }: Props) => {
    const {
        data: organisation,
        isPending,
        isRefetching,
    } = useQuery({
        initialData,
        networkMode: "online",
        queryFn: () => getOrganisationById(id),
        queryKey: ["organisation", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    return (
        <>
            {isPending && <SpinnerBall className="size-4 animate-spin" />}
            {!isPending && !organisation && <span>Organisation not found</span>}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Naam</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBall className="size-4 animate-spin" />
                    ) : (
                        organisation?.name
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Naam</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBall className="size-4 animate-spin" />
                    ) : (
                        organisation?.btw_number
                    )}
                </span>
            </div>
        </>
    );
};

export default CurrentState;
