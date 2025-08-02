"use client";

import { ArrowsOutSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { format, isSameDay } from "date-fns";
import { nlBE } from "date-fns/locale";
import React, { useMemo } from "react";
import { useLocale } from "use-intl";

import Checkbox from "@/components/atoms/Checkbox";
import DataTable, { Pagination } from "@/components/atoms/DataTable";
import { Link } from "@/i18n/navigation";
import getReservations, {
    GetReservationsResponse,
} from "@/service/reservations/getReservations";
import filterByDateRange from "@/utils/table/filters/filterByDateRange";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

const columnHelper =
    createColumnHelper<NonNullable<GetReservationsResponse>[number]>();

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
                        "size-4 rounded-[4px] opacity-50 hover:opacity-100 transition-opacity duration-200"
                    )}
                    href={`/dashboard/reservations/${row.original.id}`}
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
    columnHelper.accessor(({ access_code }) => access_code || "-", {
        header: "Toegangscode",
        id: "access_code",
    }),
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
    columnHelper.accessor(({ organization }) => organization?.name || "-", {
        header: "Organisatie",
        id: "organization",
    }),
    columnHelper.accessor(
        ({ invoiced }) =>
            invoiced ? "ja" : invoiced === false ? "nee" : "onbekend",
        { header: "Gefactureerd", id: "invoiced" }
    ),
];

const Table = () => {
    const { data } = useQuery({
        queryFn: getReservations,
        queryKey: ["reservations"],
    });
    const reservations = useMemo(() => data ?? [], [data]);
    const table = useReactTable({
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

    return (
        <div className="flex flex-col gap-2">
            <DataTable table={table} />
            <Pagination table={table} />
        </div>
    );
};

export { columns };
export default Table;
