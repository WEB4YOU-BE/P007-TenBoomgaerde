import type { TableFeature } from "@tanstack/react-table";
import type { Table } from "@tanstack/table-core";

const RowActionsFeature = <TData,>(): TableFeature<TData> => ({
    createTable: (table: Table<TData>) => {
        table.getAllRowActions = () => table.options.actions ?? [];
    },
});

export default RowActionsFeature;
