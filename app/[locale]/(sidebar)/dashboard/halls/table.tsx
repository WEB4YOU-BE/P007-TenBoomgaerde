"use client";

import { ArrowsOutSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";

import Checkbox from "@/components/atoms/Checkbox";
import DataTable, { Pagination } from "@/components/atoms/DataTable";
import { Link } from "@/i18n/navigation";
import getHalls, { GetHallsResponse } from "@/service/halls/getHalls";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

const columnHelper =
    createColumnHelper<NonNullable<GetHallsResponse>[number]>();

const columns = [
    columnHelper.display({
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onCheckedChange={row.getToggleSelectedHandler()}
                />
                <Link
                    className={cn(
                        buttonVariants({ size: "icon", variant: "ghost" }),
                        "size-4 rounded-[4px] !bg-transparent opacity-50 hover:opacity-100 transition-opacity duration-200"
                    )}
                    href={`/dashboard/reservations/${row.original.id}`}
                    onClick={(e) => e.stopPropagation()} // Prevent row selection when clicking the link
                >
                    <ArrowsOutSimpleIcon className="size-full" />
                </Link>
            </div>
        ),
        enableHiding: false,
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsSomeRowsSelected()
                        ? "indeterminate"
                        : table.getIsAllRowsSelected()
                }
                onCheckedChange={(value: CheckedState) => {
                    table.toggleAllRowsSelected(!!value);
                }}
            />
        ),
        id: "select",
    }),
    columnHelper.accessor((row) => row.name || "-", {
        header: "Naam",
        id: "name",
    }),
    columnHelper.accessor((row) => (row.is_private ? "Ja" : "Nee"), {
        header: "Privé",
        id: "is_private",
    }),
    columnHelper.accessor(
        (row) => (row.price_per_day != null ? row.price_per_day : "-"),
        {
            header: "Prijs per tijdsblok",
            id: "price_per_day",
        }
    ),
    columnHelper.accessor(
        (row) =>
            row.price_per_day_discount != null
                ? row.price_per_day_discount
                : "-",
        {
            header: "Korting per tijdsblok",
            id: "price_per_day_discount",
        }
    ),
];

const Table = () => {
    const { data } = useQuery({
        queryFn: getHalls,
        queryKey: ["halls"],
    });
    const halls = useMemo(() => data ?? [], [data]);
    const table = useReactTable({
        columns,
        data: halls,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getRowId: (row) => row.id,
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            columnPinning: { left: ["select"] },
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: false, id: "name" }],
        },
    });

    return (
        <div className="flex flex-col gap-2">
            <DataTable table={table} />
            <Pagination table={table} />
        </div>
    );
};

export { columns };
export default Table;
