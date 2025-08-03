import type { RowData } from "@tanstack/react-table";

import type {
    RowAction,
    RowActionsInstance,
} from "@/types/features/table/rowActions";

// Declaration merging for TanStack Table
declare module "@tanstack/react-table" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Table<TData extends RowData> extends RowActionsInstance<TData> {}
    interface TableOptionsResolved<TData extends RowData> {
        actions?: RowAction<TData>[];
    }
}
