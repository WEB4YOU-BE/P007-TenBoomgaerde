import {
    SortAscendingIcon,
    SortDescendingIcon,
} from "@phosphor-icons/react/dist/ssr";
import { type Table as TTable } from "@tanstack/react-table";
import React, { type ChangeEvent, useCallback } from "react";

import Button from "@/components/atoms/Button";

function SortDropdown<TData>({ table }: { table: TTable<TData> }) {
    // Get all columns that can be sorted
    const sortableColumns = table
        .getAllColumns()
        .filter((col) => col.getCanSort());
    const sorted = table.getState().sorting?.[0];
    const currentId = sorted?.id;
    const currentDesc = sorted?.desc;

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            const colId = e.target.value;
            if (!colId) table.setSorting([]);
            else
                table.setSorting([
                    {
                        desc: currentId === colId ? !currentDesc : false,
                        id: colId,
                    },
                ]);
        },
        [currentDesc, currentId, table]
    );

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm" htmlFor="sort-column">
                Sort by:
            </label>
            <select
                className="border rounded px-2 py-1 text-sm"
                id="sort-column"
                onChange={handleChange}
                value={currentId || ""}
            >
                <option value="">None</option>
                {sortableColumns.map((col) => (
                    <option key={col.id} value={col.id}>
                        {col.columnDef.header?.toString() || col.id}
                        {currentId === col.id
                            ? currentDesc
                                ? " ↑"
                                : " ↓"
                            : ""}
                    </option>
                ))}
            </select>
            {currentId && (
                <Button
                    onClick={() =>
                        table.setSorting([
                            { desc: !currentDesc, id: currentId },
                        ])
                    }
                    title="Sorteervolgorde wisselen"
                    type="button"
                    variant={"ghost"}
                >
                    {currentDesc ? (
                        <SortDescendingIcon />
                    ) : (
                        <SortAscendingIcon />
                    )}
                </Button>
            )}
        </div>
    );
}

export default SortDropdown;
