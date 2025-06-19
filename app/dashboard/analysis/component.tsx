/* eslint-disable perfectionist/sort-objects */
"use client";

import * as XLSX from "@e965/xlsx";
import Link from "next/link";
import React, { FC } from "react";

import { getOrganisationById } from "@/app/dashboard/organisations/[id]/actions";
import { getUserById } from "@/app/dashboard/reservations/[id]/actions";
import { Tables } from "@/types/supabase/database";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

import {
    getHallById,
    getTimeslotById,
} from "../reservations/_tableCells/actions";

interface Props {
    reservations: Tables<"reservations">[];
    text: string;
}
const DownloadComponent: FC<Props> = ({ reservations, text }) => {
    const handleDownloadExcel = async () => {
        const timeframes = await Promise.all(
            Array.from(
                new Set(
                    reservations
                        .flatMap((r) => [r.start_hour, r.end_hour])
                        .filter(Boolean)
                )
            ).map((id) => getTimeslotById(id || ""))
        );
        const halls = await Promise.all(
            reservations.map((reservation) =>
                getHallById(reservation.room_id || "")
            )
        );
        const users = await Promise.all(
            reservations.map((reservation) =>
                getUserById(reservation.user_id || "")
            )
        );
        const organizations = await Promise.all(
            reservations.map((reservation) =>
                getOrganisationById(reservation.organizations_id || "")
            )
        );

        // Now, map to rows synchronously
        const rows = reservations.map((reservation) => {
            const user = users.find((user) => user?.id === reservation.user_id);
            const reserverName = user
                ? `${user.firstname} ${user.lastname} (${user.email})`
                : "Onbekend";
            return {
                Reservatienummer:
                    reservation.reservation_year.substring(0, 4) +
                    "-" +
                    reservation.reservation_number,
                Startdatum: reservation.start_date
                    ? new Date(reservation.start_date).toLocaleDateString(
                          "nl-NL",
                          {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                          }
                      )
                    : "Onbekend",
                Einddatum: reservation.end_date
                    ? new Date(reservation.end_date).toLocaleDateString(
                          "nl-NL",
                          {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                          }
                      )
                    : "Onbekend",
                Startuur: timeframes.find(
                    (tf) => tf?.id === reservation.start_hour
                )?.start_hour,
                Einduur: timeframes.find(
                    (tf) => tf?.id === reservation.end_hour
                )?.end_hour,
                Zaal:
                    halls.find((hall) => hall?.id === reservation.room_id)
                        ?.name || "Onbekend",
                Reserveerder: reserverName,
                Organisatie:
                    organizations.find(
                        (org) => org?.id === reservation.organizations_id
                    )?.name || "Onbekend",
                Toegangscode:
                    reservation.access_code === null
                        ? "Onbekend"
                        : reservation.access_code,
                Status: reservation.status,
                Gefactureerd: reservation.gefactureerd ? "Ja" : "Nee",
            };
        });

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(rows);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Reservations");

        // customize header names
        XLSX.utils.sheet_add_aoa(worksheet, [
            [
                "Reservatienummer",
                "Start datum",
                "Eind datum",
                "Start uur",
                "Eind uur",
                "Zaal",
                "Reserveerder",
                "Organisatie",
                "Toegangscode",
                "Status",
                "Gefactureerd",
            ],
        ]);

        XLSX.writeFile(workbook, "Reservaties.xlsx", { compression: true });
    };

    return (
        <div className="rounded border p-4 flex flex-row gap-2 justify-between items-center">
            <h2 className="font-semibold text-xl">{text}</h2>
            <div aria-label="actions" className="flex flex-row gap-2">
                <Link
                    className={buttonVariants({ variant: "ghost" })}
                    href="/dashboard/reservations/"
                >
                    Bekijk alle reservaties
                </Link>
                <button
                    className={buttonVariants()}
                    onClick={() => {
                        void handleDownloadExcel();
                    }}
                >
                    Excel
                </button>
                {/* <button className={buttonVariants()}>PDF</button> */}
            </div>
        </div>
    );
};
export default DownloadComponent;
