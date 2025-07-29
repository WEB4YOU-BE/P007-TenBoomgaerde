import { type Table as TTable } from "@tanstack/react-table";
import React, {
    type ChangeEvent,
    type ComponentPropsWithoutRef,
    useCallback,
    useMemo,
} from "react";

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
    const handleSetGlobalFilter = useCallback(
        (e: ChangeEvent<HTMLInputElement>) =>
            table.setGlobalFilter(e.target.value),
        [table]
    );
    const globalFilter: unknown = table.getState().globalFilter;
    const globalFilterValue = useMemo(
        () => (typeof globalFilter === "string" ? globalFilter : ""),
        [globalFilter]
    );

    return (
        <div className={cn("flex items-center gap-2", className)} {...props}>
            <label className="sr-only" htmlFor="global-search">
                Global Search
            </label>
            <Input
                className="input"
                id="global-search"
                onChange={handleSetGlobalFilter}
                placeholder="Zoeken..."
                type="text"
                value={globalFilterValue}
            />
        </div>
    );
};

export default GlobalSearch;
