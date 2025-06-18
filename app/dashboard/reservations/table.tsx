"use client";

import {
    ArrowsDownUpIcon,
    FunnelIcon,
    InfoIcon,
} from "@phosphor-icons/react/ssr";
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
import { Input } from "@/components/atoms/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/atoms/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/atoms/table";
import { Tables } from "@/types/supabase/database";

import HallCell from "./_tableCells/Hall";
import OrganisationCell from "./_tableCells/Organization";
import RenterCell from "./_tableCells/Renter";
import TimeslotsCell from "./_tableCells/Timeslots";

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
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <FunnelIcon className="" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Input placeholder="Filter reservatienummers" />
                        </PopoverContent>
                    </Popover>
                </div>
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
                    <Button size="icon" variant="ghost">
                        <FunnelIcon className="" />
                    </Button>
                </div>
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
                <div className="flex flex-row gap-1 items-center">
                    <div>Zaal</div>
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
                    <Button size="icon" variant="ghost">
                        <FunnelIcon className="" />
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
                    <Button size="icon" variant="ghost">
                        <FunnelIcon className="" />
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
                    <Button size="icon" variant="ghost">
                        <FunnelIcon className="" />
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
                    <Button size="icon" variant="ghost">
                        <FunnelIcon className="" />
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
