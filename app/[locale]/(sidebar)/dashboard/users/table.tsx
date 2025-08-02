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
import parsePhoneNumberFromString from "libphonenumber-js";
import React, { useMemo } from "react";

import Checkbox from "@/components/atoms/Checkbox";
import DataTable, { Pagination } from "@/components/atoms/DataTable";
import { Link } from "@/i18n/navigation";
import getUsers, { GetUsersResponse } from "@/service/users/getUsers";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";
const columnHelper =
    createColumnHelper<NonNullable<GetUsersResponse>[number]>();

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
    columnHelper.accessor(
        (row) => {
            const value = row.phone ?? "";
            const parsed = value
                ? parsePhoneNumberFromString(value, { defaultCountry: "BE" })
                : undefined;
            return parsed ? parsed.formatInternational() : "-";
        },
        {
            header: "Telefoon",
            id: "phone",
        }
    ),
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
        getRowId: (row) => row.id,
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            columnPinning: { left: ["select"] },
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: false, id: "fullname" }],
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
