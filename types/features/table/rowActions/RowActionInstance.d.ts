import { RowAction } from "@/types/features/table/rowActions/RowAction";

export interface RowActionsInstance<TData> {
    getAllRowActions: () => RowAction<TData>[];
}
