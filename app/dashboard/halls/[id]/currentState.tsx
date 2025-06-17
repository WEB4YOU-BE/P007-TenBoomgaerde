"use client";

import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import type { Tables } from "@/types/supabase/database";

import Checkbox from "@/components/atoms/Checkbox";

import { getHallById } from "./actions";

interface Props {
    id: string;
    initialData?: Tables<"rooms">;
}
const CurrentState = ({ id, initialData }: Props) => {
    const {
        data: hall,
        isPending,
        isRefetching,
    } = useQuery({
        initialData,
        networkMode: "online",
        queryFn: () => getHallById(id),
        queryKey: ["hall", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    return (
        <>
            {isPending && <SpinnerBall className="size-4 animate-spin" />}
            {!isPending && !hall && <span>Hall not found</span>}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Naam</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBall className="size-4 animate-spin" />
                    ) : (
                        hall?.name
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Prijs per blok</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBall className="size-4 animate-spin" />
                    ) : (
                        hall?.day_price
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                    Prijs per 2 blokken
                </span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBall className="size-4 animate-spin" />
                    ) : (
                        hall?.day_price2
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                    <span className="text-sm flex flex-row gap-2 shrink-0">
                        {isRefetching ? (
                            <SpinnerBall className="size-4 animate-spin" />
                        ) : (
                            <Checkbox
                                checked={hall?.private}
                                contentEditable={false}
                                disabled={isRefetching}
                            />
                        )}
                        Privaat
                    </span>
                </span>
            </div>
        </>
    );
};

export default CurrentState;
