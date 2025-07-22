"use client";

import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { format, isSameDay } from "date-fns";
import { nlBE } from "date-fns/locale";
import React from "react";
import { useLocale } from "use-intl";

import DataTable from "@/components/atoms/DataTable";
import { Link } from "@/i18n/navigation";
import getReservations, {
    GetReservationsResponse,
} from "@/service/reservations/getReservations";

const columnHelper =
    createColumnHelper<NonNullable<GetReservationsResponse["data"]>[number]>();

const columns = [
    columnHelper.accessor(
        (row) => {
            const { reservation_number, start } = row.reservation;
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
        (row) => {
            const { end, start } = row.reservation;
            if (!start || !end) return "Geen data ingevoerd";
            const startDate = new Date(start);
            const endDate = new Date(end);
            const locale = useLocale();
            const dateFNSLocale = locale === "nl-BE" ? nlBE : undefined;
            return `${format(startDate, "Pp", { locale: dateFNSLocale })} tot ${format(endDate, isSameDay(startDate, endDate) ? "p" : "Pp", { locale: dateFNSLocale })}`;
        },
        {
            header: "Data",
            id: "dates",
            sortingFn: (a, b) => {
                const dateA = new Date(a.original.reservation.start ?? "");
                const dateB = new Date(b.original.reservation.start ?? "");
                return dateA.getTime() - dateB.getTime();
            },
        }
    ),
    columnHelper.accessor(
        (row) => {
            const halls = row.reservation.halls;
            return halls?.length
                ? halls.map((h) => h.name).join(", ")
                : "Geen zaal geselecteerd";
        },
        { header: "Zaal", id: "hall" }
    ),
    columnHelper.accessor((row) => row.reservation.status || "-", {
        header: "Status",
        id: "status",
    }),
    columnHelper.accessor(
        (row) => {
            const booker = row.reservation.booker;
            if (!booker) return "Gebruiker reeds verwijderd";
            const fullName = [booker.firstname, booker.lastname]
                .filter(Boolean)
                .join(" ")
                .trim();
            return fullName || "-";
        },
        { header: "Reserveerder", id: "renter" }
    ),
    columnHelper.accessor(
        (row) => {
            const org = row.reservation.organization;
            return org?.name || (org ? "Onbekende organisatie" : "-");
        },
        { header: "Organisatie", id: "organization" }
    ),
    columnHelper.accessor(
        (row) =>
            row.reservation.gefactureerd === undefined
                ? "onbekend"
                : row.reservation.gefactureerd
                  ? "ja"
                  : "nee",
        { header: "Gefactureerd", id: "billed" }
    ),
    columnHelper.display({
        cell: ({ row }) => (
            <Link
                href={`/dashboard/reservations/${row.original.reservation.id}`}
            >
                <InfoIcon className="size-6" />
            </Link>
        ),
        id: "actions",
    }),
];

const Table = () => {
    const { data } = useQuery({
        queryFn: getReservations,
        queryKey: ["reservations"],
    });
    const table = useReactTable({
        columns,
        data: data?.data ?? [],
        getCoreRowModel: getCoreRowModel(),
    });

    return <DataTable table={table} />;
};

export { columns };
export default Table;
