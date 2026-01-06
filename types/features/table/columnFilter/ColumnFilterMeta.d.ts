import "@tanstack/react-table";

export type ColumnFilterType =
    | "boolean"
    | "date"
    | "date-range"
    | "number"
    | "select"
    | "text";

export interface ColumnFilterMeta {
    /** The type of filter input to render */
    filterType?: ColumnFilterType;
    /** Options for select filter type */
    filterOptions?: { label: string; value: string }[];
    /** Placeholder text for the filter input */
    filterPlaceholder?: string;
}

declare module "@tanstack/react-table" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
    interface ColumnMeta<TData, TValue> extends ColumnFilterMeta {}
}
