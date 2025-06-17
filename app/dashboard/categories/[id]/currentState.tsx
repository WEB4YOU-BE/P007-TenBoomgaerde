"use client";

import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import type { Tables } from "@/types/supabase/database";

import { getCategoryById } from "./actions";

interface Props {
    id: string;
    initialData?: Tables<"categories">;
}
const CurrentState = ({ id, initialData }: Props) => {
    const {
        data: category,
        isPending,
        isRefetching,
    } = useQuery({
        initialData,
        networkMode: "online",
        queryFn: () => getCategoryById(id),
        queryKey: ["category", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    return (
        <>
            {isPending && <SpinnerBall className="size-4 animate-spin" />}
            {!isPending && !category && <span>Hall not found</span>}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Naam</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBall className="size-4 animate-spin" />
                    ) : (
                        category?.name
                    )}
                </span>
            </div>
        </>
    );
};

export default CurrentState;
