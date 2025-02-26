"use client";

import { Button } from "@/components/atoms/button";
import { Tables } from "@/types/supabase/database";
import { ArrowsDownUp, Info } from "@phosphor-icons/react/dist/ssr";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

export const columns: ColumnDef<Tables<"users">>[] = [
    {
        accessorFn: ({ firstname, lastname }) => {
            if (!firstname && !lastname) return "Geen naam";
            return `${firstname || "(geen voornaam)"} ${lastname || "(geen achternaam)"}`;
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
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
            );
        },
        id: "name",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Email
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
            );
        },
    },
    {
        accessorFn: ({ phone }) => {
            if (!phone) return "Geen telefoonnummer";
            return phone;
        },
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Telefoonnummer
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
            );
        },
    },
    {
        accessorFn: ({ city, postcode, street }) => {
            if (!street || !postcode || !city)
                return "Geen of onvolledig adres";
            return `${street}, ${postcode} ${city}`;
        },
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Adres
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
            );
        },
        id: "address",
    },
    {
        accessorFn: ({ is_admin }) => {
            return is_admin ? "Ja" : "Nee";
        },
        header: ({ column }) => {
            return (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    variant="ghost"
                >
                    Is administrator
                    <ArrowsDownUp className="ml-2 size-4" />
                </Button>
            );
        },
        id: "admin",
    },
    {
        accessorKey: "id",
        cell: ({ row }) => (
            <Link href={`/dashboard/users/${row.original.id}`}>
                <Info className="size-6" />
            </Link>
        ),
        header: () => {
            return <p>Acties</p>;
        },
        id: "actions",
    },
];

export { DataTable } from "@/components/ui/dashboard/dataTable";
