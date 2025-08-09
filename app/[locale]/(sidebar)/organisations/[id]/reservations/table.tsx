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

import DataTable from "@/components/atoms/DataTable";
import getReservationsForOrganisation, {
    GetReservationsForOrganisationResponse,
} from "@/service/reservations/getReservationsForOrganisation";
import filterByDateRange from "@/utils/table/filters/filterByDateRange";

type TData = NonNullable<GetReservationsForOrganisationResponse>[number];

const columnHelper = createColumnHelper<TData>();

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
                ? reservations_halls.map((h) => h.hall.name).join(", ")
                : "Geen zaal geselecteerd",
        { header: "Zaal", id: "hall" }
    ),
    columnHelper.accessor(({ status }) => status || "-", {
        header: "Status",
        id: "status",
    }),
    columnHelper.accessor(
        ({ access_code, start, status }) => {
            if (!access_code || status !== "goedgekeurd" || !start) return "-";
            const startDate = new Date(start);
            const sundayBefore = startOfWeek(startDate, { weekStartsOn: 0 });
            const now = new Date();
            if (now < sundayBefore) return "-";
            return access_code.toString().padStart(4, "0");
        },
        {
            header: "Toegangscode",
            id: "access_code",
        }
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
            getReservationsForOrganisation({
                organisationId,
                signal,
            }),
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
