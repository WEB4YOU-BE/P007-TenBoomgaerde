"use client";

import { ArrowsDownUpIcon, InfoIcon } from "@phosphor-icons/react/ssr";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import React from "react";

import Button from "@/components/atoms/Button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/atoms/table";
import { Tables } from "@/types/supabase/database";

import OrganisationCell from "./_tableCells/Organization";
import RenterCell from "./_tableCells/Renter";

export const columns: ColumnDef<Tables<"reservations">>[] = [
    {
        accessorFn: ({ reservation_number, reservation_year }) => {
            if (!reservation_year || !reservation_number)
                return "Geen geldige nummer";
            return `${reservation_year.substring(0, 4)}-${reservation_number}`;
        },
        header: ({ column }) => {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <div>RES-NR</div>
                    <Button
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowsDownUpIcon className="" />
                    </Button>
                </div>
            );
        },
        id: "reservationNumber",
    },
    {
        accessorFn: ({ end, start }) => {
            if (!start || !end) return "Geen data ingevoerd";
            const startDate = new Date(start);
            const endDate = new Date(end);

            const sameDay =
                startDate.toLocaleDateString() === endDate.toLocaleDateString();

            const formatDate = (date: Date) =>
                date.toLocaleDateString("nl-BE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });

            return sameDay
                ? formatDate(startDate)
                : `${formatDate(startDate)} tot ${formatDate(endDate)}`;
        },
        header: ({ column }) => {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <div>Data</div>
                    <Button
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowsDownUpIcon className="" />
                    </Button>
                </div>
            );
        },
        id: "dates",
    },
    {
        accessorFn: ({ end, start }) => {
            if (!start || !end) return "Geen data ingevoerd";
            const startDate = new Date(start);
            const endDate = new Date(end);

            const formatTime = (date: Date) =>
                date
                    .toLocaleTimeString("nl-BE", {
                        hour: "2-digit",
                        hour12: false,
                        minute: "2-digit",
                    })
                    .replace(/:00$/, "u");

            return `${formatTime(startDate)}${
                formatTime(startDate) === formatTime(endDate)
                    ? ""
                    : " tot " + formatTime(endDate)
            }`;
        },
        cell: ({ row }) => {
            const { end, start } = row.original;
            if (!start || !end) return "Geen data ingevoerd";
            const startDate = new Date(start);
            const endDate = new Date(end);

            const formatTime = (date: Date) =>
                date
                    .toLocaleTimeString("nl-BE", {
                        hour: "2-digit",
                        hour12: false,
                        minute: "2-digit",
                    })
                    .replace(/:00$/, "u");

            return `${formatTime(startDate)}${
                formatTime(startDate) === formatTime(endDate)
                    ? ""
                    : " tot " + formatTime(endDate)
            }`;
        },
        header: ({ column }) => {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <div>Uren</div>
                    <Button
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowsDownUpIcon className="" />
                    </Button>
                </div>
            );
        },
        id: "timeframes",
    },
    {
        cell: "Geen ruimte geselecteerd",
        header: ({ column }) => {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <div>TODO: implement zaal</div>
                    <Button
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowsDownUpIcon className="" />
                    </Button>
                </div>
            );
        },
        id: "hall",
    },
    {
        accessorFn: ({ status }) => {
            if (!status) return "onbekend";
            return status;
        },
        header: ({ column }) => {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <div>Status</div>
                    <Button
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowsDownUpIcon className="" />
                    </Button>
                </div>
            );
        },
        id: "status",
    },
    {
        accessorFn: ({ user_id }) => {
            if (!user_id) return "onbekend";
            return user_id;
        },
        cell: ({ row }) =>
            row.original.user_id ? (
                <RenterCell id={row.original.user_id} />
            ) : (
                "Gebruiker reeds verwijderd"
            ),
        header: ({ column }) => {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <div>Reserveerder</div>
                    <Button
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowsDownUpIcon className="" />
                    </Button>
                </div>
            );
        },
        id: "renter",
    },
    {
        accessorFn: ({ organizations_id }) => {
            if (!organizations_id) return "onbekend";
            return organizations_id;
        },
        cell: ({ row }) =>
            row.original.organizations_id ? (
                <OrganisationCell id={row.original.organizations_id} />
            ) : (
                "Geen organisatie geselecteerd"
            ),
        header: ({ column }) => {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <div>Organisatie</div>
                    <Button
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowsDownUpIcon className="" />
                    </Button>
                </div>
            );
        },
        id: "organization",
    },
    {
        accessorFn: ({ gefactureerd }) => {
            if (gefactureerd === undefined) return "onbekend";
            return gefactureerd ? "ja" : "nee";
        },
        header: ({ column }) => {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <div>Gefactureerd</div>
                    <Button
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowsDownUpIcon className="" />
                    </Button>
                </div>
            );
        },
        id: "billed",
    },
    {
        accessorKey: "id",
        cell: ({ row }) => (
            <Link href={`/dashboard/reservations/${row.original.id}`}>
                <InfoIcon className="size-6" />
            </Link>
        ),
        header: () => {
            return <p>Acties</p>;
        },
        id: "actions",
    },
];

interface TableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: TableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        state: { columnFilters, sorting },
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                data-state={row.getIsSelected() && "selected"}
                                key={row.id}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                className="h-24 text-center"
                                colSpan={columns.length}
                            >
                                Geen resultaten.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
