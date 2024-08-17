"use client";

import { Button } from "@/components/atoms/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { Tables } from "@/types/supabase/database.types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import TimeslotsCell from "./_tableCells/Timeslots";
import RenterCell from "./_tableCells/Renter";
import HallCell from "./_tableCells/Hall";
import OrganisationCell from "./_tableCells/Organization";

export const columns: ColumnDef<Tables<"reservations">>[] = [
  {
    id: "reservationNumber",
    accessorFn: ({ reservation_year: year, reservation_number: number }) => {
      if (!year || !number) return "Geen geldige nummer";
      return `${year}-${number}`;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RES-Nr
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "dates",
    accessorFn: ({ start_date, end_date }) => {
      if (!start_date || !end_date) return "Geen data ingevoerd";
      return `${start_date}${start_date === end_date ? "" : " tot " + end_date}`;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "timeframes",
    cell: ({ row }) =>
      row.original.start_hour && row.original.end_hour ? (
        <TimeslotsCell
          startHourID={row.original.start_hour}
          endHourID={row.original.end_hour}
        />
      ) : (
        "Geen data ingevoerd"
      ),
    accessorFn: ({ start_hour, end_hour }) => {
      if (!start_hour || !end_hour) return "Geen data ingevoerd";
      return `${start_hour}${start_hour === end_hour ? "" : " tot " + end_hour}`;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Uren
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "hall",
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
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Zaal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "status",
    accessorFn: ({ status }) => {
      if (!status) return "onbekend";
      return status;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "renter",
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
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reserveerder
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "organization",
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
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Via organisatie
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "billed",
    accessorFn: ({ gefactureerd }) => {
      if (gefactureerd === undefined) return "onbekend";
      return gefactureerd ? "ja" : "nee";
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gefactureerd
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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
                          header.column.columnDef.header,
                          header.getContext(),
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
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Geen resultaten.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
