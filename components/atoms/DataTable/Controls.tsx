"use client";

import { type Table as TTable } from "@tanstack/react-table";
import { ComponentPropsWithoutRef } from "react";
import React from "react";

interface PaginationProps<TData> extends ComponentPropsWithoutRef<"div"> {
    table: TTable<TData>;
}
const Controls = <TData,>({
    className,
    table,
    ...props
}: PaginationProps<TData>) => {
    return (
        <div className={className} {...props}>
            {/* Render your controls here */}
            {/* Pagination is already handled in the Pagination component */}
            {/* But in here we do the column sorting, filtering, and global search */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 px-2">
                <div className="flex items-center gap-2">
                    <label className="sr-only" htmlFor="global-search">
                        Global Search
                    </label>
                    <input
                        className="input"
                        id="global-search"
                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                        placeholder="Zoeken..."
                        type="text"
                        value={
                            typeof (table.getState()
                                .globalFilter as unknown) === "string"
                                ? (table.getState().globalFilter as string)
                                : ""
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Controls;
