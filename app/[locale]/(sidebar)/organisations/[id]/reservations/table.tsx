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
import { format, isSameDay, startOfWeek } from "date-fns";
import { nlBE } from "date-fns/locale";
import React, { useCallback, useMemo } from "react";
import { useLocale } from "use-intl";

import Badge from "@/components/atoms/Badge";
import DataTable from "@/components/atoms/DataTable";
import getReservationsForOrganisation, {
    GetReservationsForOrganisationResponse,
} from "@/service/reservations/getReservationsForOrganisation";
import filterByDateRange from "@/utils/table/filters/filterByDateRange";
import { BadgeVariantProps } from "@/utils/tailwindcss/variants/badgeVariants";

type TData = NonNullable<GetReservationsForOrganisationResponse>[number];

const columnHelper = createColumnHelper<TData>();

// Status mappings (reuse from dashboard)
const RES_STATUS_TO_BADGE_VARIANT: Record<
    "ACCEPTED" | "DECLINED" | "PENDING",
    BadgeVariantProps["variant"]
> = { ACCEPTED: "default", DECLINED: "destructive", PENDING: "secondary" };

const RES_STATUS_LABEL_NL: Record<"ACCEPTED" | "DECLINED" | "PENDING", string> =
    {
        ACCEPTED: "Goedgekeurd",
        DECLINED: "Afgewezen",
        PENDING: "In afwachting",
    };

const normalizeReservationStatus = (
    status: TData["status"]
): "ACCEPTED" | "DECLINED" | "PENDING" | undefined => {
    if (!status) return undefined;
    const s = String(status).toLowerCase();
    if (s === "accepted" || s === "goedgekeurd") return "ACCEPTED";
    if (s === "pending" || s === "in afwachting") return "PENDING";
    if (s === "declined" || s === "geweigerd") return "DECLINED";
    return undefined;
};

const getReservationStatusLabel = (status: TData["status"]) => {
    const key = normalizeReservationStatus(status);
    return key ? RES_STATUS_LABEL_NL[key] : "";
};

const columns = [
    columnHelper.accessor(
        ({ reservation_number, start }) => {
            if (start && reservation_number != null) {
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
            const locale = useLocale();
            const dateFNSLocale = locale === "nl-BE" ? nlBE : undefined;
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
    columnHelper.accessor(
        ({ reservations_halls }) =>
            reservations_halls?.length
                ? reservations_halls
                      .map((h) => h.hall?.name || "Onbekend")
                      .join(", ")
                : "Geen zaal geselecteerd",
        { header: "Zaal", id: "hall" }
    ),
    columnHelper.accessor((row) => getReservationStatusLabel(row.status), {
        cell: (info) => {
            const key = normalizeReservationStatus(info.row.original.status);
            if (!key) return <span>-</span>;
            return (
                <Badge variant={RES_STATUS_TO_BADGE_VARIANT[key]}>
                    {RES_STATUS_LABEL_NL[key]}
                </Badge>
            );
        },
        header: "Status",
        id: "status",
        sortingFn: (rowA, rowB) => {
            const a = getReservationStatusLabel(rowA.original.status);
            const b = getReservationStatusLabel(rowB.original.status);
            if (!a && !b) return 0;
            if (!a) return 1;
            if (!b) return -1;
            return a.localeCompare(b, "nl", { sensitivity: "base" });
        },
    }),
    columnHelper.accessor(
        ({ access_code, start, status }) => {
            const norm = normalizeReservationStatus(status);
            if (!access_code || norm !== "ACCEPTED" || !start) return "-";
            const startDate = new Date(start);
            const sundayBefore = startOfWeek(startDate, { weekStartsOn: 0 });
            const now = new Date();
            if (now < sundayBefore) return "-";
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
];

const Table = ({ organisationId }: { organisationId: string }) => {
    const queryFunction = useCallback(
        ({ signal }: { signal: AbortSignal }) =>
            getReservationsForOrganisation({ organisationId, signal }),
        [organisationId]
    );
    const { data } = useQuery({
        queryFn: queryFunction,
        queryKey: ["organisation-reservations", organisationId],
    });
    const reservations = useMemo(() => data ?? [], [data]);
    const table = useReactTable<TData>({
        columns,
        data: reservations,
        enableRowSelection: false,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getRowId: (row) => row.id,
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            columnVisibility: {
                access_code: true,
                dates: true,
                hall: true,
                renter: true,
                reservationNumber: false,
                status: true,
            },
            pagination: { pageIndex: 0, pageSize: 20 },
            sorting: [{ desc: true, id: "dates" }],
        },
    });

    return <DataTable table={table} />;
};

export { columns };
export default Table;
