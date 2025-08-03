import type { Table } from "@tanstack/react-table";

export interface RowAction<TData> {
    buttonLabel: string;
    disabled?: (table: Table<TData>) => boolean;
    fn: (table: Table<TData>) => void;
    id: string;
}
