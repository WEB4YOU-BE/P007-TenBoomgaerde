"use client";

import type { Tables } from "@/types/supabase/database";

import { Checkbox } from "@/components/atoms/checkbox";
import { useQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import React from "react";

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
        initialDataUpdatedAt: initialData ? Date.now() : undefined,
        networkMode: "online",
        queryFn: () => getHallById(id),
        queryKey: ["hall", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    return (
        <>
            {isPending && <LoaderPinwheel className="h-4 w-4 animate-spin" />}
            {!isPending && !hall && <span>Hall not found</span>}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Naam</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <LoaderPinwheel className="h-4 w-4 animate-spin" />
                    ) : (
                        hall?.name
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Prijs per blok</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <LoaderPinwheel className="h-4 w-4 animate-spin" />
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
                        <LoaderPinwheel className="h-4 w-4 animate-spin" />
                    ) : (
                        hall?.day_price2
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                    <span className="text-sm flex flex-row gap-2 shrink-0">
                        {isRefetching ? (
                            <LoaderPinwheel className="h-4 w-4 animate-spin" />
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
