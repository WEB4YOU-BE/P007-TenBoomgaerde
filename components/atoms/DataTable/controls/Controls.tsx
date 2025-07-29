"use client";

import { type Table as TTable } from "@tanstack/react-table";
import { ComponentPropsWithoutRef } from "react";
import React from "react";

import {
    GlobalSearch,
    SortDropdown,
} from "@/components/atoms/DataTable/controls";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface ControlsProps<TData> extends ComponentPropsWithoutRef<"div"> {
    table: TTable<TData>;
}
const Controls = <TData,>({
    className,
    table,
    ...props
}: ControlsProps<TData>) => {
    return (
        <div
            className={cn(
                "flex flex-col md:flex-row md:justify-between md:items-center gap-2 px-2",
                className
            )}
            {...props}
        >
            {/* Render your controls here */}
            {/* Pagination is already handled in the Pagination component */}
            {/* But in here we do the column sorting, filtering, and global search */}
            <GlobalSearch table={table} />
            <SortDropdown table={table} />
        </div>
    );
};

export default Controls;
