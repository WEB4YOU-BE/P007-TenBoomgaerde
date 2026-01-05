"use client";

import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useMemo } from "react";
import { toast } from "sonner";

import Checkbox from "@/components/atoms/Checkbox";
import DataTable from "@/components/atoms/DataTable";
import RowActionsFeature from "@/features/table/RowActionsFeature";
import getMembersForOrganisation, {
    GetMembersForOrganisationResponse,
} from "@/service/organisations/getMembersForOrganisation";
import removeMemberFromOrganisation from "@/service/organisations/removeMemberFromOrganisation";
import { RowAction } from "@/types/features/table/rowActions/RowAction";

type TData = NonNullable<GetMembersForOrganisationResponse>[number];

const columnHelper = createColumnHelper<TData>();

const columns = [
    columnHelper.display({
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onCheckedChange={row.getToggleSelectedHandler()}
            />
        ),
        enableHiding: false,
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsSomeRowsSelected()
                        ? "indeterminate"
                        : table.getIsAllRowsSelected()
                }
                onCheckedChange={(value) => {
                    table.toggleAllRowsSelected(!!value);
                }}
            />
        ),
        id: "select",
    }),
    columnHelper.accessor(
        (row) => {
            const fullName = [row.firstname, row.lastname]
                .filter(Boolean)
                .join(" ")
                .trim();
            return fullName || "-";
        },
        { header: "Naam", id: "fullname" }
    ),
    columnHelper.accessor((row) => row.email, {
        header: "E-mail",
        id: "email",
    }),
];

const actions: (
    queryClient: QueryClient,
    organisationId: string
) => RowAction<TData>[] = (queryClient, organisationId) => [
    {
        buttonLabel: "Verwijder uit organisatie",
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen leden geselecteerd");

                    for (const row of selectedRows) {
                        await removeMemberFromOrganisation({
                            organisationId,
                            userId: row.id,
                        });
                    }

                    await queryClient.invalidateQueries({
                        queryKey: ["organisation-members", organisationId],
                    });
                    table.toggleAllRowsSelected(false);
                },
                {
                    error: (error) =>
                        `Fout bij verwijderen: ${error instanceof Error ? error.message : String(error)}`,
                    loading: "Bezig met verwijderen...",
                    success: "Leden succesvol verwijderd uit de organisatie",
                }
            );
        },
        id: "remove-member",
    },
];

interface TableProps {
    organisationId: string;
}

const Table = ({ organisationId }: TableProps) => {
    const queryClient = useQueryClient();
    const queryFunction = useCallback(
        ({ signal }: { signal: AbortSignal }) =>
            getMembersForOrganisation({ organisationId, signal }),
        [organisationId]
    );
    const { data } = useQuery({
        queryFn: queryFunction,
        queryKey: ["organisation-members", organisationId],
    });
    const members = useMemo(() => data ?? [], [data]);
    const table = useReactTable<TData>({
        _features: [RowActionsFeature<TData>()],
        actions: actions(queryClient, organisationId),
        columns,
        createHref: `/organisations/${organisationId}/members/new`,
        data: members,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getRowId: (row) => row.id,
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            columnPinning: { left: ["select"] },
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: false, id: "fullname" }],
        },
    });

    return <DataTable table={table} />;
};

export { columns };
export default Table;
