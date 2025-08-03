import { Table } from "@tanstack/react-table";
import { ComponentPropsWithRef } from "react";
import React from "react";

import ColumnSort from "@/components/atoms/DataTable/TopBar/ColumnSort";
import ColumnVisibility from "@/components/atoms/DataTable/TopBar/ColumnVisibility";
import TableActions from "@/components/atoms/DataTable/TopBar/TableActions";
import TableSearch from "@/components/atoms/DataTable/TopBar/TableSearch";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface TopBarProps<TData> extends ComponentPropsWithRef<"div"> {
    table: Table<TData>;
}
const TopBar = <TData,>({ className, table, ...props }: TopBarProps<TData>) => (
    <div
        className={cn(
            "flex flex-col gap-2 items-stretch md:items-center md:flex-row",
            className
        )}
        {...props}
    >
        <TableSearch table={table} />
        <ColumnSort table={table} />
        {/* PLACEHOLDER ColumnFilter */}
        <ColumnVisibility table={table} />
        <TableActions table={table} />
    </div>
);

export default TopBar;
