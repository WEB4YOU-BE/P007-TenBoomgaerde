"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import React from "react";

import { getCategoryById } from "./actions";

interface CategoryCellProps {
    id: string;
}
const CategoryCell = ({ id }: CategoryCellProps) => {
    const { data, isPending } = useQuery({
        networkMode: "online",
        queryFn: () => getCategoryById(id),
        queryKey: ["category", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    if (isPending) return <LoaderPinwheel className="h-4 w-4 animate-spin" />;
    return data?.[0]?.name;
};

export default CategoryCell;
