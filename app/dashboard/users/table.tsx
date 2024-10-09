"use client";

import { Button } from "@/components/atoms/button";
import { Tables } from "@/types/supabase/database";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
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
                    <ArrowUpDown className="ml-2 h-4 w-4" />
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
                    <ArrowUpDown className="ml-2 h-4 w-4" />
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
                    <ArrowUpDown className="ml-2 h-4 w-4" />
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
                    <ArrowUpDown className="ml-2 h-4 w-4" />
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
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        id: "admin",
    },
];

export { DataTable } from "@/components/ui/dashboard/dataTable";
