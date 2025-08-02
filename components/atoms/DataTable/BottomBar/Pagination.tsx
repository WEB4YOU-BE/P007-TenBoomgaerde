"use client";

import {
    CaretDoubleLeftIcon,
    CaretDoubleRightIcon,
    CaretLeftIcon,
    CaretRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { type Table as TTable } from "@tanstack/react-table";
import { ComponentPropsWithoutRef, useCallback, useMemo } from "react";
import React from "react";

import Button from "@/components/atoms/Button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface PaginationProps<TData> extends ComponentPropsWithoutRef<"div"> {
    table: TTable<TData>;
}
const Pagination = <TData,>({
    className,
    table,
    ...props
}: PaginationProps<TData>) => {
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();
    const pageSizeOptions = useMemo(
        () => Array.from({ length: 6 }, (_, i) => 10 * Math.pow(2, i)),
        []
    );

    const handlePageSizeChange = useCallback(
        (value: string) => table.setPageSize(Number(value)),
        [table]
    );

    const canPreviousPage = table.getCanPreviousPage();
    const canNextPage = table.getCanNextPage();

    const handleFirstPage = useCallback(() => table.setPageIndex(0), [table]);
    const handlePreviousPage = useCallback(() => table.previousPage(), [table]);
    const handleNextPage = useCallback(() => table.nextPage(), [table]);
    const handleLastPage = useCallback(
        () => table.setPageIndex(pageCount - 1),
        [table, pageCount]
    );

    return (
        <div
            className={cn(
                "flex flex-col gap-2 sm:flex-row sm:justify-end sm:items-center",
                className
            )}
            {...props}
        >
            <div className="flex justify-end items-center gap-2">
                <p className="text-sm font-medium">Rijen per pagina</p>
                <Select
                    onValueChange={handlePageSizeChange}
                    value={pageSize.toString()}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={pageSize.toString()} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {pageSizeOptions.map((pageSize) => (
                            <SelectItem
                                key={pageSize}
                                value={pageSize.toString()}
                            >
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end items-center gap-2">
                <div className="flex sm:min-w-[120px] items-center justify-center text-sm font-medium">
                    Pagina {pageIndex + 1} van {pageCount}
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        className="size-8"
                        disabled={!canPreviousPage}
                        onClick={handleFirstPage}
                        size="icon"
                        variant="outline"
                    >
                        <span className="sr-only">Ga naar eerste pagina</span>
                        <CaretDoubleLeftIcon />
                    </Button>
                    <Button
                        className="size-8"
                        disabled={!canPreviousPage}
                        onClick={handlePreviousPage}
                        size="icon"
                        variant="outline"
                    >
                        <span className="sr-only">Ga naar vorige pagina</span>
                        <CaretLeftIcon />
                    </Button>
                    <Button
                        className="size-8"
                        disabled={!canNextPage}
                        onClick={handleNextPage}
                        size="icon"
                        variant="outline"
                    >
                        <span className="sr-only">Ga naar volgende pagina</span>
                        <CaretRightIcon />
                    </Button>
                    <Button
                        className="size-8"
                        disabled={!canNextPage}
                        onClick={handleLastPage}
                        size="icon"
                        variant="outline"
                    >
                        <span className="sr-only">Ga naar laatste pagina</span>
                        <CaretDoubleRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
