"use client";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { ComponentPropsWithoutRef } from "react";

const Table = ({ className, ...props }: ComponentPropsWithoutRef<"table">) => {
    return (
        <div className="relative w-full overflow-auto">
            <table
                className={cn("w-full caption-bottom text-sm", className)}
                data-slot="table"
                {...props}
            />
        </div>
    );
};

const TableBody = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"tbody">) => {
    return (
        <tbody
            className={cn("[&_tr:last-child]:border-0", className)}
            data-slot="table-body"
            {...props}
        />
    );
};

const TableCaption = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"caption">) => {
    return (
        <caption
            className={cn("text-muted-foreground mt-4 text-sm", className)}
            data-slot="table-caption"
            {...props}
        />
    );
};

const TableCell = ({ className, ...props }: ComponentPropsWithoutRef<"td">) => {
    return (
        <td
            className={cn(
                "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                className
            )}
            data-slot="table-cell"
            {...props}
        />
    );
};

const TableFooter = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"tfoot">) => {
    return (
        <tfoot
            className={cn(
                "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
                className
            )}
            data-slot="table-footer"
            {...props}
        />
    );
};

const TableHead = ({ className, ...props }: ComponentPropsWithoutRef<"th">) => {
    return (
        <th
            className={cn(
                "text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                className
            )}
            data-slot="table-head"
            {...props}
        />
    );
};

const TableHeader = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"thead">) => {
    return (
        <thead
            className={cn("[&_tr]:border-b", className)}
            data-slot="table-header"
            {...props}
        />
    );
};

const TableRow = ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => {
    return (
        <tr
            className={cn(
                "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
                className
            )}
            data-slot="table-row"
            {...props}
        />
    );
};

export {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
};
