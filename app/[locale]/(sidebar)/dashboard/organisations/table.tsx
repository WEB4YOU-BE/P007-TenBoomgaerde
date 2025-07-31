"use client";

import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";

import DataTable, { Controls, Pagination } from "@/components/atoms/DataTable";
import { Link } from "@/i18n/navigation";
import getOrganisations, {
    GetOrganisationsResponse,
} from "@/service/organisations/getOrganisations";

const columnHelper =
    createColumnHelper<NonNullable<GetOrganisationsResponse>[number]>();

const columns = [
    columnHelper.accessor("name", {
        cell: (info) => info.getValue() || "-",
        header: "Naam",
    }),
    columnHelper.accessor("btw_number", {
        cell: (info) => info.getValue() || "-",
        header: "BTW-nummer",
    }),
    columnHelper.accessor(
        (row) => {
            if (!row.users_organizations?.length) return "-";
            return row.users_organizations
                .map((uo) => {
                    const user = uo.users;
                    if (!user) return "-";
                    const fullName = [user.firstname, user.lastname]
                        .filter(Boolean)
                        .join(" ")
                        .trim();
                    return fullName || "-";
                })
                .join(", ");
        },
        { header: "Leden", id: "members" }
    ),
    columnHelper.display({
        cell: ({ row }) => (
            <Link href={`/dashboard/organisations/${row.original.id}`}>
                <InfoIcon className="size-6" />
            </Link>
        ),
        id: "actions",
    }),
];

const Table = () => {
    const { data } = useQuery({
        queryFn: getOrganisations,
        queryKey: ["organisations"],
    });
    const organisations = useMemo(() => data ?? [], [data]);
    const table = useReactTable({
        columns,
        data: organisations,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: false, id: "name" }],
        },
    });

    return (
        <div className="flex flex-col gap-2">
            <Controls table={table} />
            <DataTable table={table} />
            <Pagination table={table} />
        </div>
    );
};

export { columns };
export default Table;
