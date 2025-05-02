"use client";

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
import { ArrowsDownUp, Info } from "@phosphor-icons/react/dist/ssr";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import React from "react";

import HallCell from "./_tableCells/Hall";
import OrganisationCell from "./_tableCells/Organization";
import RenterCell from "./_tableCells/Renter";
import TimeslotsCell from "./_tableCells/Timeslots";

export const columns: ColumnDef<Tables<"reservations">>[] = [
    {
        accessorFn: ({
            reservation_number: number,
            reservation_year: year,
        }) => {
            if (!year || !number) return "Geen geldige nummer";
            return `${year}-${number}`;
        },
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    RES-Nr
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
            );
        },
        id: "reservationNumber",
    },
    {
        accessorFn: ({ end_date, start_date }) => {
            if (!start_date || !end_date) return "Geen data ingevoerd";
            return `${start_date}${start_date === end_date ? "" : " tot " + end_date}`;
        },
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Data
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
            );
        },
        id: "dates",
    },
    {
        accessorFn: ({ end_hour, start_hour }) => {
            if (!start_hour || !end_hour) return "Geen data ingevoerd";
            return `${start_hour}${start_hour === end_hour ? "" : " tot " + end_hour}`;
        },
        cell: ({ row }) =>
            row.original.start_hour && row.original.end_hour ? (
                <TimeslotsCell
                    endHourID={row.original.end_hour}
                    startHourID={row.original.start_hour}
                />
            ) : (
                "Geen data ingevoerd"
            ),
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Uren
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
            );
        },
        id: "timeframes",
    },
    {
        accessorFn: ({ room_id }) => {
            if (!room_id) return "Geen zaal geselecteerd";
            return room_id;
        },
        cell: ({ row }) =>
            row.original.room_id ? (
                <HallCell id={row.original.room_id} />
            ) : (
                "Geen ruimte geselecteerd"
            ),
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Zaal
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
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
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Status
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
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
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Reserveerder
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
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
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Via organisatie
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
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
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Gefactureerd
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
            );
        },
        id: "billed",
    },
    {
        accessorKey: "id",
        cell: ({ row }) => (
            <Link href={`/dashboard/reservations/${row.original.id}`}>
                <Info className="size-6" />
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

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: { sorting },
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
