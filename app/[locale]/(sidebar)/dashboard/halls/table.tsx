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
import React, { useMemo } from "react";

import DataTable, { Controls, Pagination } from "@/components/atoms/DataTable";
import { Link } from "@/i18n/navigation";
import getHalls, { GetHallsResponse } from "@/service/halls/getHalls";

const columnHelper =
    createColumnHelper<NonNullable<GetHallsResponse>[number]>();

const columns = [
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
    columnHelper.display({
        cell: ({ row }) => (
            <Link href={`/dashboard/halls/${row.original.id}`}>
                <InfoIcon className="size-6" />
            </Link>
        ),
        id: "actions",
    }),
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
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: false, id: "name" }],
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
