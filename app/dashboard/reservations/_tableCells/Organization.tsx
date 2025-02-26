"use client";

import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getOrganizationById } from "./actions";

interface OrganisationCellProps {
    id: string;
}
const OrganisationCell = ({ id }: OrganisationCellProps) => {
    const { data, isPending } = useQuery({
        networkMode: "online",
        queryFn: () => getOrganizationById(id),
        queryKey: ["organisation", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    return !isPending ? (
        `${data?.[0].name || "geen naam"}`
    ) : (
        <SpinnerBall className="size-4 animate-spin" />
    );
};

export default OrganisationCell;
