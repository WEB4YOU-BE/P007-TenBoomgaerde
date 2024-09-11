"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
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
        <LoaderPinwheel className="h-4 w-4 animate-spin" />
    );
};

export default HallCell;
