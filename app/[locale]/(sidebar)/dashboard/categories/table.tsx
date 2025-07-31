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
import getCategories, {
    GetCategoriesResponse,
} from "@/service/categories/getCategories";

const columnHelper =
    createColumnHelper<NonNullable<GetCategoriesResponse>[number]>();

const columns = [
    columnHelper.accessor("name", {
        cell: (info) => info.getValue() || "-",
        header: "Naam",
        id: "name",
    }),
    columnHelper.display({
        cell: ({ row }) => (
            <Link href={`/dashboard/categories/${row.original.id}`}>
                <InfoIcon className="size-6" />
            </Link>
        ),
        id: "actions",
    }),
];

const Table = () => {
    const { data } = useQuery({
        queryFn: getCategories,
        queryKey: ["categories"],
    });
    const categories = useMemo(() => data ?? [], [data]);
    const table = useReactTable({
        columns,
        data: categories,
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
