import { Table } from "@tanstack/react-table";
import { ComponentPropsWithRef } from "react";
import React from "react";

import Pagination from "@/components/atoms/DataTable/BottomBar/Pagination";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface BottomBarProps<TData> extends ComponentPropsWithRef<"div"> {
    table: Table<TData>;
}
const BottomBar = <TData,>({
    className,
    table,
    ...props
}: BottomBarProps<TData>) => (
    <div
        className={cn(
            "flex flex-col gap-2 items-stretch md:justify-between md:items-center md:flex-row",
            className
        )}
        {...props}
    >
        <div /> {/* Placeholder for row selection */}
        <Pagination table={table} />
    </div>
);

export default BottomBar;
