import { flexRender, type Table as TTable } from "@tanstack/react-table";
import React from "react";

import BottomBar from "@/components/atoms/DataTable/BottomBar";
import TopBar from "@/components/atoms/DataTable/TopBar";
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
    <div className="flex flex-col gap-2">
        <TopBar table={table} />
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
                                onClick={() => row.toggleSelected()}
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
        <BottomBar table={table} />
    </div>
);

export default DataTable;
