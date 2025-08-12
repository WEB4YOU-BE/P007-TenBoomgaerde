"use client";

import {
    ArrowsOutSimpleIcon,
    QuestionMarkIcon,
} from "@phosphor-icons/react/dist/ssr";
import { CheckedState } from "@radix-ui/react-checkbox";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { toast } from "sonner";

import { AvatarFallback } from "@/components/atoms/Avatar";
import Avatar from "@/components/atoms/Avatar/Avatar";
import Badge from "@/components/atoms/Badge";
import Checkbox from "@/components/atoms/Checkbox";
import DataTable from "@/components/atoms/DataTable";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/atoms/tooltip";
import RowActionsFeature from "@/features/table/RowActionsFeature";
import { Link } from "@/i18n/navigation";
import getOrganisations, {
    GetOrganisationsResponse,
} from "@/service/organisations/getOrganisations";
import updateOrganisationsStatus from "@/service/organisations/updateOrganisationsStatus";
import { RowAction } from "@/types/features/table/rowActions/RowAction";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { BadgeVariantProps } from "@/utils/tailwindcss/variants/badgeVariants";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

type TData = NonNullable<GetOrganisationsResponse>[number];

// Map acceptance status to Badge variants
const STATUS_TO_BADGE_VARIANT: Record<
    NonNullable<TData["acceptance_status"]>,
    BadgeVariantProps["variant"]
> = {
    ACCEPTED: "default",
    DECLINED: "destructive",
    PENDING: "secondary",
};

// Dutch labels for acceptance status
const STATUS_LABEL_NL: Record<
    NonNullable<TData["acceptance_status"]>,
    string
> = {
    ACCEPTED: "Goedgekeurd",
    DECLINED: "Afgewezen",
    PENDING: "In afwachting",
};

// Helper for safe status-to-label mapping (handles null/undefined)
const getStatusLabel = (status: TData["acceptance_status"]) => {
    if (!status) return "";
    return STATUS_LABEL_NL[status];
};

const columnHelper = createColumnHelper<TData>();

const columns = [
    columnHelper.display({
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onCheckedChange={row.getToggleSelectedHandler()}
                />
                <Link
                    className={cn(
                        buttonVariants({ size: "icon", variant: "ghost" }),
                        "size-4 rounded-[4px] !bg-transparent opacity-50 hover:opacity-100 transition-opacity duration-200"
                    )}
                    href={`/dashboard/reservations/${row.original.id}`}
                    onClick={(e) => e.stopPropagation()} // Prevent row selection when clicking the link
                >
                    <ArrowsOutSimpleIcon className="size-full" />
                </Link>
            </div>
        ),
        enableHiding: false,
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsSomeRowsSelected()
                        ? "indeterminate"
                        : table.getIsAllRowsSelected()
                }
                onCheckedChange={(value: CheckedState) => {
                    table.toggleAllRowsSelected(!!value);
                }}
            />
        ),
        id: "select",
    }),
    columnHelper.accessor((row) => STATUS_LABEL_NL[row.acceptance_status], {
        cell: (info) => {
            const status = info.row.original.acceptance_status;
            if (!status) return <span>-</span>;
            return (
                <Badge variant={STATUS_TO_BADGE_VARIANT[status]}>
                    {STATUS_LABEL_NL[status]}
                </Badge>
            );
        },
        header: "Status",
        id: "acceptance_status",
        sortingFn: (rowA, rowB) => {
            const a = getStatusLabel(rowA.original.acceptance_status);
            const b = getStatusLabel(rowB.original.acceptance_status);
            // Undefined/empty statuses go to the bottom
            if (!a && !b) return 0;
            if (!a) return 1;
            if (!b) return -1;
            return a.localeCompare(b, "nl", { sensitivity: "base" });
        },
    }),
    columnHelper.accessor("name", {
        cell: (info) => info.getValue() || "-",
        header: "Naam",
    }),
    columnHelper.accessor("vat", {
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
];

const actions: (queryClient: QueryClient) => RowAction<TData>[] = (
    queryClient
) => [
    {
        buttonLabel: `Markeer als ${STATUS_LABEL_NL["ACCEPTED"].toLocaleLowerCase()}`,
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen rijen geselecteerd");

                    const organisationIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateOrganisationsStatus({
                        organisationIds,
                        signal,
                        status: "ACCEPTED",
                    });

                    await queryClient.invalidateQueries({
                        queryKey: ["organisations"],
                    });
                },
                {
                    error: (error) => `Fout bij markeren: ${error}`,
                    loading: `Bezig met markeren als ${STATUS_LABEL_NL["ACCEPTED"].toLocaleLowerCase()}...`,
                    success: `Rijen succesvol gemarkeerd als ${STATUS_LABEL_NL["ACCEPTED"].toLocaleLowerCase()}`,
                }
            );
        },
        id: "mark-as-approved",
    },
    {
        buttonLabel: `Markeer als ${STATUS_LABEL_NL["PENDING"].toLocaleLowerCase()}`,
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen rijen geselecteerd");

                    const organisationIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateOrganisationsStatus({
                        organisationIds,
                        signal,
                        status: "PENDING",
                    });

                    await queryClient.invalidateQueries({
                        queryKey: ["organisations"],
                    });
                },
                {
                    error: (error) => `Fout bij markeren: ${error}`,
                    loading: `Bezig met markeren als ${STATUS_LABEL_NL["PENDING"].toLocaleLowerCase()}...`,
                    success: `Rijen succesvol gemarkeerd als ${STATUS_LABEL_NL["PENDING"].toLocaleLowerCase()}`,
                }
            );
        },
        id: "mark-as-pending",
    },
    {
        buttonLabel: `Markeer als ${STATUS_LABEL_NL["DECLINED"].toLocaleLowerCase()}`,
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen rijen geselecteerd");

                    const organisationIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateOrganisationsStatus({
                        organisationIds,
                        signal,
                        status: "DECLINED",
                    });

                    await queryClient.invalidateQueries({
                        queryKey: ["organisations"],
                    });
                },
                {
                    error: (error) => `Fout bij markeren: ${error}`,
                    loading: `Bezig met markeren als ${STATUS_LABEL_NL["DECLINED"].toLocaleLowerCase()}...`,
                    success: `Rijen succesvol gemarkeerd als ${STATUS_LABEL_NL["DECLINED"].toLocaleLowerCase()}`,
                }
            );
        },
        id: "mark-as-rejected",
    },
];

const Table = () => {
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryFn: getOrganisations,
        queryKey: ["organisations"],
    });
    const organisations = useMemo(() => data ?? [], [data]);

    const table = useReactTable<TData>({
        _features: [RowActionsFeature<TData>()],
        actions: actions(queryClient),
        columns,
        data: organisations,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getRowId: (row) => row.id,
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            columnPinning: { left: ["select"] },
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: false, id: "name" }],
        },
    });

    return <DataTable table={table} />;
};

export { columns };
export default Table;
