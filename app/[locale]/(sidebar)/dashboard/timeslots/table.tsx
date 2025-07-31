"use client";

import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
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

import DataTable, { Controls, Pagination } from "@/components/atoms/DataTable";
import { Link } from "@/i18n/navigation";
import getTimeslots, {
    GetTimeslotsResponse,
} from "@/service/timeslots/getTimeslots";

const columnHelper =
    createColumnHelper<NonNullable<GetTimeslotsResponse>[number]>();

const columns = [
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
    columnHelper.display({
        cell: ({ row }) => (
            <Link href={`/dashboard/timeslots/${row.original.id}`}>
                <InfoIcon className="size-6" />
            </Link>
        ),
        id: "actions",
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
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: false, id: "start_time" }],
        },
    });

    return (
        <div className="flex flex-col gap-2">
            <Controls table={table} />
            <DataTable table={table} />
            <Pagination table={table} />
        </div>
    );
};

export { columns };
export default Table;
