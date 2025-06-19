"use client";

import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
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
        `${data?.firstname || "(geen voornaam)"} ${data?.lastname || "(geen achternaam)"}`
    ) : (
        <SpinnerBallIcon className="size-4 animate-spin" />
    );
};

export default RenterCell;
