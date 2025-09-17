"use client";

import { ArrowsOutSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { CheckedState } from "@radix-ui/react-checkbox";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type Table,
    useReactTable,
} from "@tanstack/react-table";
import { format, isSameDay, startOfWeek } from "date-fns";
import { nlBE } from "date-fns/locale";
import React, { useMemo } from "react";
import { toast } from "sonner";

import Badge from "@/components/atoms/Badge";
import Checkbox from "@/components/atoms/Checkbox";
import DataTable from "@/components/atoms/DataTable";
import RowActionsFeature from "@/features/table/RowActionsFeature";
import { Link } from "@/i18n/navigation";
import getReservations, {
    GetReservationsResponse,
} from "@/service/reservations/getReservations";
import updateReservationsInvoiced from "@/service/reservations/updateReservationsInvoiced";
import updateReservationsStatus from "@/service/reservations/updateReservationsStatus";
import { RowAction } from "@/types/features/table/rowActions/RowAction";
import { Enums } from "@/types/supabase/database";
import filterByDateRange from "@/utils/table/filters/filterByDateRange";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { BadgeVariantProps } from "@/utils/tailwindcss/variants/badgeVariants";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

type TData = NonNullable<GetReservationsResponse>[number];

const columnHelper = createColumnHelper<TData>();

// Status mappings (reuse same approach as organisations)
const RES_STATUS_TO_BADGE_VARIANT: Record<
    Enums<"reservation_status">,
    BadgeVariantProps["variant"]
> = { ACCEPTED: "default", DECLINED: "destructive", PENDING: "secondary" };

const RES_STATUS_LABEL_NL = {
    ACCEPTED: "Goedgekeurd",
    DECLINED: "Afgewezen",
    PENDING: "In afwachting",
} as const satisfies Record<Enums<"reservation_status">, string>;

// Generic function: passing a specific status yields the corresponding string literal type.
const getReservationStatusLabel = <S extends Enums<"reservation_status">>(
    status: S
): (typeof RES_STATUS_LABEL_NL)[S] => RES_STATUS_LABEL_NL[status];

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
                    onClick={(e) => {
                        e.stopPropagation();
                    }} // Prevent row selection when clicking the link
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
    columnHelper.accessor(
        ({ reservation_number, start }) => {
            if (start) {
                return `${start.slice(0, 4)}-${reservation_number
                    .toString()
                    .padStart(4, "0")}`;
            }
            return "Geen geldige nummer";
        },
        { header: "RES-NR", id: "reservationNumber" }
    ),
    columnHelper.accessor(
        ({ end, start }) => {
            if (!start || !end) return "Geen data ingevoerd";
            const startDate = new Date(start);
            const endDate = new Date(end);
            // Always use nlBE as locale
            const dateFNSLocale = nlBE;
            return `${format(startDate, "Pp", { locale: dateFNSLocale })} tot ${format(endDate, isSameDay(startDate, endDate) ? "p" : "Pp", { locale: dateFNSLocale })}`;
        },
        {
            filterFn: (row, _, [filterStart, filterEnd]: [Date?, Date?]) =>
                filterByDateRange({
                    end: row.original.end
                        ? new Date(row.original.end)
                        : undefined,
                    filterEnd,
                    filterStart,
                    start: row.original.start
                        ? new Date(row.original.start)
                        : undefined,
                }),
            header: "Data",
            id: "dates",
            sortingFn: (a, b) => {
                const dateA = new Date(a.original.start ?? "");
                const dateB = new Date(b.original.start ?? "");
                return dateA.getTime() - dateB.getTime();
            },
        }
    ),
    // is_party:
    columnHelper.accessor(({ is_party }) => (is_party ? "Ja" : "Nee"), {
        header: "Feest",
        id: "is_party",
    }),
    columnHelper.accessor(
        ({ reservations_halls }) =>
            reservations_halls.length
                ? reservations_halls.map((h) => h.hall.name).join(", ")
                : "Geen zaal geselecteerd",
        { header: "Zaal", id: "hall" }
    ),
    columnHelper.accessor((row) => getReservationStatusLabel(row.status), {
        cell: (info) => (
            <Badge
                variant={RES_STATUS_TO_BADGE_VARIANT[info.row.original.status]}
            >
                {RES_STATUS_LABEL_NL[info.row.original.status]}
            </Badge>
        ),
        header: "Status",
        id: "status",
        sortingFn: (rowA, rowB) => {
            const a = getReservationStatusLabel(rowA.original.status);
            const b = getReservationStatusLabel(rowB.original.status);
            return a.localeCompare(b, "nl", { sensitivity: "base" });
        },
    }),
    columnHelper.accessor(
        ({ access_code, start, status }) => {
            if (!access_code || status !== "ACCEPTED" || !start) return "-";
            // Calculate the Sunday before the reservation starts using date-fns
            const startDate = new Date(start);
            const sundayBefore = startOfWeek(startDate, { weekStartsOn: 0 });
            const now = new Date();
            if (now < sundayBefore) return "-";
            // Always show as four digits
            return access_code.toString().padStart(4, "0");
        },
        { header: "Toegangscode", id: "access_code" }
    ),
    columnHelper.accessor(
        ({ booker }) => {
            if (!booker) return "Gebruiker reeds verwijderd";
            const fullName = [booker.firstname, booker.lastname]
                .filter(Boolean)
                .join(" ")
                .trim();
            return fullName || "-";
        },
        { header: "Reserveerder", id: "renter" }
    ),
    columnHelper.accessor(({ organization }) => organization?.name ?? "-", {
        header: "Organisatie",
        id: "organization",
    }),
    columnHelper.accessor(
        ({ invoiced }) =>
            invoiced ? "ja" : invoiced === false ? "nee" : "onbekend",
        { header: "Gefactureerd", id: "invoiced" }
    ),
];

const actions: (queryClient: QueryClient) => RowAction<TData>[] = (
    queryClient
) => [
    // Mark status actions (goedgekeurd, in afwachting, geweigerd)
    {
        buttonLabel: `Markeer als ${RES_STATUS_LABEL_NL.ACCEPTED.toLocaleLowerCase()}`,
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen rijen geselecteerd");

                    const reservationIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateReservationsStatus({
                        reservationIds,
                        signal,
                        status: "ACCEPTED",
                    });

                    await queryClient.invalidateQueries({
                        queryKey: ["reservations"],
                    });
                },
                {
                    error: (error) =>
                        `Fout bij markeren: ${error instanceof Error ? error.message : String(error)}`,
                    loading: `Bezig met markeren als ${RES_STATUS_LABEL_NL.ACCEPTED.toLocaleLowerCase()}...`,
                    success: `Rijen succesvol gemarkeerd als ${RES_STATUS_LABEL_NL.ACCEPTED.toLocaleLowerCase()}`,
                }
            );
        },
        id: "mark-as-approved",
    },
    {
        buttonLabel: `Markeer als ${RES_STATUS_LABEL_NL.PENDING.toLocaleLowerCase()}`,
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen rijen geselecteerd");

                    const reservationIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateReservationsStatus({
                        reservationIds,
                        signal,
                        status: "PENDING",
                    });

                    await queryClient.invalidateQueries({
                        queryKey: ["reservations"],
                    });
                },
                {
                    error: (error) =>
                        `Fout bij markeren: ${error instanceof Error ? error.message : String(error)}`,
                    loading: `Bezig met markeren als ${RES_STATUS_LABEL_NL.PENDING.toLocaleLowerCase()}...`,
                    success: `Rijen succesvol gemarkeerd als ${RES_STATUS_LABEL_NL.PENDING.toLocaleLowerCase()}`,
                }
            );
        },
        id: "mark-as-pending",
    },
    {
        buttonLabel: `Markeer als ${RES_STATUS_LABEL_NL.DECLINED.toLocaleLowerCase()}`,
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen rijen geselecteerd");

                    const reservationIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateReservationsStatus({
                        reservationIds,
                        signal,
                        status: "DECLINED",
                    });

                    await queryClient.invalidateQueries({
                        queryKey: ["reservations"],
                    });
                },
                {
                    error: (error) =>
                        `Fout bij markeren: ${error instanceof Error ? error.message : String(error)}`,
                    loading: `Bezig met markeren als ${RES_STATUS_LABEL_NL.DECLINED.toLocaleLowerCase()}...`,
                    success: `Rijen succesvol gemarkeerd als ${RES_STATUS_LABEL_NL.DECLINED.toLocaleLowerCase()}`,
                }
            );
        },
        id: "mark-as-rejected",
    },
    // Mark as invoiced and not invoiced actions
    {
        buttonLabel: "Markeer als gefactureerd",
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen rijen geselecteerd");

                    const reservationIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateReservationsInvoiced({
                        invoiced: true,
                        reservationIds,
                        signal,
                    });

                    await queryClient.invalidateQueries({
                        queryKey: ["reservations"],
                    });
                },
                {
                    error: (error) =>
                        `Fout bij markeren: ${error instanceof Error ? error.message : String(error)}`,
                    loading: "Bezig met markeren als gefactureerd...",
                    success: "Rijen succesvol gemarkeerd als gefactureerd",
                }
            );
        },
        id: "mark-as-invoiced",
    },
    {
        buttonLabel: "Markeer als niet gefactureerd",
        disabled: (table) => table.getSelectedRowModel().rows.length === 0,
        fn: (table) => {
            toast.promise(
                async () => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    if (selectedRows.length === 0)
                        throw new Error("Geen rijen geselecteerd");

                    const reservationIds = selectedRows.map((row) => row.id);
                    const signal = AbortSignal.timeout(5000);
                    await updateReservationsInvoiced({
                        invoiced: false,
                        reservationIds,
                        signal,
                    });

                    await queryClient.invalidateQueries({
                        queryKey: ["reservations"],
                    });
                },
                {
                    error: (error) =>
                        `Fout bij markeren: ${error instanceof Error ? error.message : String(error)}`,
                    loading: "Bezig met markeren als niet gefactureerd...",
                    success: "Rijen succesvol gemarkeerd als niet gefactureerd",
                }
            );
        },
        id: "mark-as-not-invoiced",
    },
];

const Table = () => {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryFn: getReservations,
        queryKey: ["reservations"],
    });
    const reservations = useMemo(() => data ?? [], [data]);
    const table = useReactTable<TData>({
        _features: [RowActionsFeature<TData>()],
        actions: actions(queryClient),
        columns,
        data: reservations,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getRowId: (row) => row.id,
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            columnPinning: { left: ["select"] },
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: true, id: "dates" }],
        },
    });

    return <DataTable table={table} />;
};

export { columns };
export default Table;
