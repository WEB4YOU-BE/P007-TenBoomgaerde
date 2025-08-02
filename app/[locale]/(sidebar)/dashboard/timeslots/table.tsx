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
import { format } from "date-fns";
import { nlBE } from "date-fns/locale";
import React, { useMemo } from "react";

import Checkbox from "@/components/atoms/Checkbox";
import DataTable, { Pagination } from "@/components/atoms/DataTable";
import { Link } from "@/i18n/navigation";
import getTimeslots, {
    GetTimeslotsResponse,
} from "@/service/timeslots/getTimeslots";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

const columnHelper =
    createColumnHelper<NonNullable<GetTimeslotsResponse>[number]>();

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
                        "size-4 rounded-[4px] opacity-50 hover:opacity-100 transition-opacity duration-200"
                    )}
                    href={`/dashboard/reservations/${row.original.id}`}
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
    columnHelper.accessor("name", {
        cell: (info) => info.getValue() || "-",
        header: "Naam",
    }),
    columnHelper.accessor("start_time", {
        cell: (info) => {
            const value = info.getValue();
            if (!value) return "-";
            const [h = 0, m = 0, s = 0, ms = 0] = value.split(":").map(Number);
            const date = new Date();
            date.setHours(h, m, s, ms);
            return format(date, "HH:mm", { locale: nlBE });
        },
        header: "Starttijd",
    }),
    columnHelper.accessor("end_time", {
        cell: (info) => {
            const value = info.getValue();
            if (!value) return "-";
            const [h = 0, m = 0, s = 0, ms = 0] = value.split(":").map(Number);
            const date = new Date();
            date.setHours(h, m, s, ms);
            return format(date, "HH:mm", { locale: nlBE });
        },
        header: "Eindtijd",
    }),
];

const Table = () => {
    const { data } = useQuery({
        queryFn: getTimeslots,
        queryKey: ["timeslots"],
    });
    const timeslots = useMemo(() => data ?? [], [data]);
    const table = useReactTable({
        columns,
        data: timeslots,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getRowId: (row) => row.id,
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            columnPinning: { left: ["select"] },
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: false, id: "start_time" }],
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
