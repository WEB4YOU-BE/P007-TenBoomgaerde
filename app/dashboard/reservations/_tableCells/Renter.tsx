"use client";

import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getRenterById } from "./actions";

interface RenterCellProps {
    id: string;
}
const RenterCell = ({ id }: RenterCellProps) => {
    const { data, isPending } = useQuery({
        networkMode: "online",
        queryFn: () => getRenterById(id),
        queryKey: ["user", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    return !isPending ? (
        `${data?.[0]?.firstname || "(geen voornaam)"} ${data?.[0]?.lastname || "(geen achternaam)"}`
    ) : (
        <SpinnerBall className="size-4 animate-spin" />
    );
};

export default RenterCell;
