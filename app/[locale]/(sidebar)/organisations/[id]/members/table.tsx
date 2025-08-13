"use client";

import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type Table,
    useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useMemo } from "react";

import DataTable from "@/components/atoms/DataTable";
import getMembersForOrganisation, {
    GetMembersForOrganisationResponse,
} from "@/service/organisations/getMembersForOrganisation";

type TData = NonNullable<GetMembersForOrganisationResponse>[number];

const columnHelper = createColumnHelper<TData>();

const columns = [
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
    columnHelper.accessor("email", {
        cell: (info) => info.getValue() || "-",
        header: "E-mail",
    }),
];

const Table = ({ organisationId }: { organisationId: string }) => {
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
        columns,
        data: members,
        enableRowSelection: false,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getRowId: (row) => row.id,
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: false, id: "fullname" }],
        },
    });

    return <DataTable table={table} />;
};

export { columns };
export default Table;
