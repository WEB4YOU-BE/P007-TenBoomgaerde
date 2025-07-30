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
import getProducts, {
    GetProductsResponse,
} from "@/service/products/getProducts";

const columnHelper =
    createColumnHelper<NonNullable<GetProductsResponse>[number]>();

const columns = [
    columnHelper.accessor((row) => row.name || "-", {
        header: "Naam",
        id: "name",
    }),
    columnHelper.accessor((row) => row.category?.name || "-", {
        header: "Categorie",
        id: "category",
    }),
    columnHelper.accessor(
        (row) =>
            row.for_sale === true
                ? "ja"
                : row.for_sale === false
                  ? "nee"
                  : "onbekend",
        {
            header: "Te koop",
            id: "for_sale",
        }
    ),
    columnHelper.accessor((row) => (row.price != null ? row.price : "-"), {
        header: "Prijs",
        id: "price",
    }),
    columnHelper.display({
        cell: ({ row }) => (
            <Link href={`/dashboard/products/${row.original.id}`}>
                <InfoIcon className="size-6" />
            </Link>
        ),
        id: "actions",
    }),
];

const Table = () => {
    const { data } = useQuery({
        queryFn: getProducts,
        queryKey: ["products"],
    });
    const products = useMemo(() => data ?? [], [data]);
    const table = useReactTable({
        columns,
        data: products,
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
