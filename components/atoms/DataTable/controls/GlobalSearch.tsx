import { type Table as TTable } from "@tanstack/react-table";
import React, { ComponentPropsWithoutRef } from "react";

import { Input } from "@/components/atoms/input";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface GlobalSearchProps<TData> extends ComponentPropsWithoutRef<"div"> {
    table: TTable<TData>;
}
const GlobalSearch = <TData,>({
    className,
    table,
    ...props
}: GlobalSearchProps<TData>) => {
    return (
        <div className={cn("flex items-center gap-2", className)} {...props}>
            <label className="sr-only" htmlFor="global-search">
                Global Search
            </label>
            <Input
                className="input"
                id="global-search"
                onChange={(e) => table.setGlobalFilter(e.target.value)}
                placeholder="Zoeken..."
                type="text"
                value={
                    typeof (table.getState().globalFilter as unknown) ===
                    "string"
                        ? (table.getState().globalFilter as string)
                        : ""
                }
            />
        </div>
    );
};

export default GlobalSearch;
