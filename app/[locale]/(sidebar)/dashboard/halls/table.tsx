"use client";

import { ArrowsOutSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { toast } from "sonner";

import type { RowAction } from "@/types/features/table/rowActions/RowAction";

import Checkbox from "@/components/atoms/Checkbox";
import DataTable from "@/components/atoms/DataTable";
import RowActionsFeature from "@/features/table/RowActionsFeature";
import { Link } from "@/i18n/navigation";
import getHalls, { GetHallsResponse } from "@/service/halls/getHalls";
import updateHallPrivacy from "@/service/halls/updateHallPrivacy";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

type TData = NonNullable<GetHallsResponse>[number];

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
        { header: "Prijs per tijdsblok", id: "price_per_day" }
    ),
    columnHelper.accessor(
        (row) =>
            row.price_per_day_discount != null
                ? row.price_per_day_discount
                : "-",
        { header: "Korting per tijdsblok", id: "price_per_day_discount" }
    ),
];

const actions: (queryClient: QueryClient) => RowAction<TData>[] = (
    queryClient
) => [
    {
        buttonLabel: "Zet op privé",
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen rijen geselecteerd");
                    const hallIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateHallPrivacy({
                        hallIds,
                        isPrivate: true,
                        signal,
                    });
                    await queryClient.invalidateQueries({
                        queryKey: ["halls"],
                    });
                },
                {
                    error: (error) => `Fout bij markeren: ${error}`,
                    loading: "Bezig met markeren als privé...",
                    success: "Zalen succesvol op privé gezet",
                }
            );
        },
        id: "mark-as-private",
    },
    {
        buttonLabel: "Maak openbaar",
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen rijen geselecteerd");
                    const hallIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateHallPrivacy({
                        hallIds,
                        isPrivate: false,
                        signal,
                    });
                    await queryClient.invalidateQueries({
                        queryKey: ["halls"],
                    });
                },
                {
                    error: (error) => `Fout bij markeren: ${error}`,
                    loading: "Bezig met markeren als openbaar...",
                    success: "Zalen succesvol openbaar gemaakt",
                }
            );
        },
        id: "mark-as-public",
    },
];

const Table = () => {
    const queryClient = useQueryClient();
    const { data } = useQuery({ queryFn: getHalls, queryKey: ["halls"] });
    const halls = useMemo(() => data ?? [], [data]);
    const table = useReactTable<TData>({
        _features: [RowActionsFeature<TData>()],
        actions: actions(queryClient),
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

    return <DataTable table={table} />;
};

export { columns };
export default Table;
