/**
 * Interface for tables with the RowActions feature.
 *
 * Note: This type only guarantees type safety. At runtime, getAllRowActions will only exist
 * if the RowActions feature is loaded for the table instance. Always check for its existence
 * before calling, or use a custom table type for strict safety.
 *
 * See TanStack Table docs:
 * https://tanstack.com/table/v8/docs/guide/custom-features#caveats-of-using-declaration-merging
 */
import { RowAction } from "@/types/features/table/rowActions/RowAction";

export interface RowActionsInstance<TData> {
    /**
     * Returns all row actions for the table instance.
     *
     * At runtime, this method only exists if the RowActions feature is loaded.
     */
    getAllRowActions: () => RowAction<TData>[];
}
