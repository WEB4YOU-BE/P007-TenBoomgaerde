import { type Table as TTable } from "@tanstack/react-table";
import React, {
    type CustomComponentPropsWithRef,
    useCallback,
    useMemo,
} from "react";

import { Input } from "@/components/atoms/input";

interface TableSearchProps<TData>
    extends Omit<
        CustomComponentPropsWithRef<typeof Input>,
        "onChange" | "value"
    > {
    table: TTable<TData>;
}

const TableSearch = <TData,>({ table, ...props }: TableSearchProps<TData>) => {
    const handleSetGlobalFilter = useCallback<
        NonNullable<CustomComponentPropsWithRef<typeof Input>["onChange"]>
    >(
        (e) => {
            table.setGlobalFilter(e.target.value);
        },
        [table]
    );
    const globalFilter: unknown = table.getState().globalFilter;
    const globalFilterValue = useMemo(
        () => (typeof globalFilter === "string" ? globalFilter : ""),
        [globalFilter]
    );

    return (
        <Input
            onChange={handleSetGlobalFilter}
            placeholder="Zoeken..."
            type="text"
            value={globalFilterValue}
            {...props}
        />
    );
};

export default TableSearch;
