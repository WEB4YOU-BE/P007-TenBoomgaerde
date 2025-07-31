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
import getUsers, { GetUsersResponse } from "@/service/users/getUsers";

const columnHelper =
    createColumnHelper<NonNullable<GetUsersResponse>[number]>();

const columns = [
    columnHelper.accessor(
        (row) => {
            const fullName = [row.firstname, row.lastname]
                .filter(Boolean)
                .join(" ")
                .trim();
            return fullName || "-";
        },
        {
            header: "Naam",
            id: "fullname",
        }
    ),
    columnHelper.accessor("email", {
        cell: (info) => info.getValue() || "-",
        header: "E-mail",
    }),
    columnHelper.accessor("phone", {
        cell: (info) => info.getValue() || "-",
        header: "Telefoon",
    }),
    columnHelper.accessor(
        (row) => {
            const street = [row.address_street, row.address_number]
                .filter(Boolean)
                .join(" ");
            const city = [row.address_postal_code, row.address_city]
                .filter(Boolean)
                .join(" ");
            const address = [street, city].filter(Boolean).join(", ");
            return address || "-";
        },
        {
            header: "Adres",
            id: "address",
        }
    ),
    columnHelper.accessor((row) => (row.is_admin ? "ja" : "nee"), {
        header: "Admin",
        id: "is_admin",
    }),
    columnHelper.display({
        cell: ({ row }) => (
            <Link href={`/dashboard/users/${row.original.id}`}>
                <InfoIcon className="size-6" />
            </Link>
        ),
        id: "actions",
    }),
];

const Table = () => {
    const { data } = useQuery({
        queryFn: getUsers,
        queryKey: ["users"],
    });
    const users = useMemo(() => data ?? [], [data]);
    const table = useReactTable({
        columns,
        data: users,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: false, id: "fullname" }],
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
