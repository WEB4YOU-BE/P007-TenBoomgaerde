"use client";

import {
    ArrowsDownUpIcon,
    InfoIcon,
    PlusIcon,
} from "@phosphor-icons/react/dist/ssr";
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

import Button from "@/components/atoms/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/atoms/table";
import { Tables } from "@/types/supabase/database";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

import CategoryCell from "./_tableCells/category";

export const columns: ColumnDef<Tables<"products">>[] = [
    {
        accessorFn: ({ name }) => {
            if (!name) return "naamloos";
            return name;
        },
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Naam
                    <ArrowsDownUpIcon className="ml-2 size-4" />
                </Button>
            );
        },
        id: "name",
    },
    {
        accessorFn: ({ price }) => {
            if (!price) return "Gratis";
            return price;
        },
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Prijs
                    <ArrowsDownUpIcon className="ml-2 size-4" />
                </Button>
            );
        },
        id: "price",
    },
    {
        cell: ({ row }) =>
            row.original.categorie_id ? (
                <CategoryCell id={row.original.categorie_id} />
            ) : (
                "geen categorie"
            ),
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Categorie
                    <ArrowsDownUpIcon className="ml-2 size-4" />
                </Button>
            );
        },
        id: "category",
    },
    {
        accessorFn: ({ for_sale }) => {
            if (!for_sale) return "te huur";
            return for_sale ? "te koop" : "te huur";
        },
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Kopen of huren
                    <ArrowsDownUpIcon className="ml-2 size-4" />
                </Button>
            );
        },
        id: "for_sale",
    },
    {
        accessorKey: "id",
        cell: ({ row }) => (
            <Link href={`/dashboard/products/${row.original.id}`}>
                <InfoIcon className="size-6" />
            </Link>
        ),
        header: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">Acties</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel asChild>
                            <Link
                                className={cn(
                                    "flex flex-row gap-2 items-center",
                                    buttonVariants({ variant: "ghost" })
                                )}
                                href="/dashboard/products/new"
                            >
                                <PlusIcon />
                                <span>Toevoegen</span>
                            </Link>
                        </DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
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
