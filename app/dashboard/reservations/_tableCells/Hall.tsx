"use client";

import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getHallById } from "./actions";

interface HallCellProps {
    id: string;
}
const HallCell = ({ id }: HallCellProps) => {
    const { data, isPending } = useQuery({
        networkMode: "online",
        queryFn: () => getHallById(id),
        queryKey: ["hall", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    return !isPending ? (
        `${data?.[0].name || "geen naam"}`
    ) : (
        <SpinnerBall className="size-4 animate-spin" />
    );
};

export default HallCell;
