"use client";

import { ArrowsOutSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { CheckedState } from "@radix-ui/react-checkbox";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { toast } from "sonner";

import type { RowAction } from "@/types/features/table/rowActions/RowAction";

import Checkbox from "@/components/atoms/Checkbox";
import DataTable from "@/components/atoms/DataTable";
import RowActionsFeature from "@/features/table/RowActionsFeature";
import { Link } from "@/i18n/navigation";
import getUsers, { GetUsersResponse } from "@/service/users/getUsers";
import sendPasswordReset from "@/service/users/sendPasswordReset";
import updateUsersAdmin from "@/service/users/updateUsersAdmin";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

type TData = NonNullable<GetUsersResponse>[number];

const columnHelper = createColumnHelper<TData>();

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
                    onClick={(e) => {
                        e.stopPropagation();
                    }} // Prevent row selection when clicking the link
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
        { header: "Naam", id: "fullname" }
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
        { header: "Telefoon", id: "phone" }
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
        { header: "Adres", id: "address" }
    ),
    columnHelper.accessor((row) => (row.is_admin ? "ja" : "nee"), {
        header: "Admin",
        id: "is_admin",
    }),
];

const actions: (queryClient: QueryClient) => RowAction<TData>[] = (
    queryClient
) => [
    {
        buttonLabel: "Stuur e-mail voor wachtwoordherstel",
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen gebruikers geselecteerd");
                    const emails = selectedRows
                        .map((row) => row.original.email)
                        .filter(Boolean);
                    await sendPasswordReset({
                        emails,
                        siteURL: new URL(window.location.href).origin,
                    });
                },
                {
                    error: (error) =>
                        `Fout bij het versturen: ${error instanceof Error ? error.message : String(error)}`,
                    loading: "Wachtwoordherstel e-mails worden verzonden...",
                    success: "E-mails succesvol verzonden",
                }
            );
        },
        id: "send-password-reset",
    },
    {
        buttonLabel: "Geef adminrechten",
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen gebruikers geselecteerd");
                    const userIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateUsersAdmin({ isAdmin: true, signal, userIds });
                    await queryClient.invalidateQueries({
                        queryKey: ["users"],
                    });
                },
                {
                    error: (error) =>
                        `Fout bij het toekennen van adminrechten: ${error instanceof Error ? error.message : String(error)}`,
                    loading: "Adminrechten worden toegekend...",
                    success: "Adminrechten succesvol toegekend",
                }
            );
        },
        id: "make-admin",
    },
    {
        buttonLabel: "Verwijder adminrechten",
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen gebruikers geselecteerd");
                    const userIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateUsersAdmin({ isAdmin: false, signal, userIds });
                    await queryClient.invalidateQueries({
                        queryKey: ["users"],
                    });
                },
                {
                    error: (error) =>
                        `Fout bij het verwijderen van adminrechten: ${error instanceof Error ? error.message : String(error)}`,
                    loading: "Adminrechten worden verwijderd...",
                    success: "Adminrechten succesvol verwijderd",
                }
            );
        },
        id: "make-not-admin",
    },
];

const Table = () => {
    const queryClient = useQueryClient();
    const { data } = useQuery({ queryFn: getUsers, queryKey: ["users"] });
    const users = useMemo(() => data ?? [], [data]);
    const table = useReactTable<TData>({
        _features: [RowActionsFeature<TData>()],
        actions: actions(queryClient),
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

    return <DataTable table={table} />;
};

export { columns };
export default Table;
