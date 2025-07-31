"use client";

import { InfoIcon, QuestionMarkIcon } from "@phosphor-icons/react/dist/ssr";
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

import { AvatarFallback } from "@/components/atoms/Avatar";
import Avatar from "@/components/atoms/Avatar/Avatar";
import DataTable, { Controls, Pagination } from "@/components/atoms/DataTable";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/atoms/tooltip";
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
        {
            cell: (info) => {
                const usersOrgs = info.row.original.users_organizations;
                if (!usersOrgs || usersOrgs.length === 0) return <span>-</span>;

                return (
                    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                        {usersOrgs.map((uo) => {
                            const user = uo.users;
                            if (!user) return null;
                            return (
                                <Tooltip key={user.id}>
                                    <TooltipTrigger>
                                        <Avatar>
                                            <AvatarFallback>
                                                {(() => {
                                                    const initials = [
                                                        user.firstname?.at(0),
                                                        user.lastname?.at(0),
                                                    ]
                                                        .filter(Boolean)
                                                        .join("")
                                                        .trim();
                                                    return initials.length >
                                                        0 ? (
                                                        initials
                                                    ) : (
                                                        <QuestionMarkIcon />
                                                    );
                                                })()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent align="start" side="bottom">
                                        {[user.firstname, user.lastname]
                                            .filter(Boolean)
                                            .join(" ")
                                            .trim() ||
                                            user.email ||
                                            "-"}
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </div>
                );
            },
            enableSorting: false,
            header: "Leden",
            id: "members",
        }
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
