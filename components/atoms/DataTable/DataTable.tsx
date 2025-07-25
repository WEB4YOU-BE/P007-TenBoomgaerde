import { flexRender, type Table as TTable } from "@tanstack/react-table";
import React from "react";

import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/atoms/Table";

interface DataTableProps<TData> {
    table: TTable<TData>;
}
const DataTable = <TData,>({ table }: DataTableProps<TData>) => (
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
                            colSpan={table.getAllColumns().length}
                        >
                            Geen resultaten gevonden.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
);

export default DataTable;
