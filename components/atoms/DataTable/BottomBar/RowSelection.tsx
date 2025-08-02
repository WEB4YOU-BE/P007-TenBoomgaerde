import { Table } from "@tanstack/react-table";
import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface RowSelectionProps<TData> extends ComponentPropsWithRef<"span"> {
    table: Table<TData>;
}

const RowSelection = <TData,>({
    className,
    table,
    ...props
}: RowSelectionProps<TData>) => {
    const selectedRowCount = table.getSelectedRowModel().rows.length;
    const totalRowCount = table.getFilteredRowModel().rows.length;

    return (
        <span
            className={cn(
                "text-sm font-medium px-2 text-end md:text-start",
                className
            )}
            {...props}
        >
            {selectedRowCount} van {totalRowCount} rijen geselecteerd
        </span>
    );
};

export default RowSelection;
