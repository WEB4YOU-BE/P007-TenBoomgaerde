/* eslint-disable perfectionist/sort-objects */
"use client";

import * as XLSX from "@e965/xlsx";
import Link from "next/link";
import React, { FC } from "react";

import { Tables } from "@/types/supabase/database";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

import { getHallById } from "../reservations/_tableCells/actions";

interface Props {
    reservations: Tables<"reservations">[];
    text: string;
}
const DownloadComponent: FC<Props> = ({ reservations, text }) => {
    const handleDownloadExcel = () => {
        const rows = reservations.map(async (reservation) => {
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
                Startuur: reservation.start_hour,
                Einduur: reservation.end_hour,
                Zaal: await getHallById(reservation.room_id || ""),
                Reserveerder: reservation.user_id,
                Organisatie: reservation.organizations_id,
                Toegangscode:
                    reservation.access_code === null
                        ? "Onbekend"
                        : reservation.access_code,
                Status: reservation.status,
                Gefactureerd: reservation.gefactureerd,
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
                    onClick={handleDownloadExcel}
                >
                    Excel
                </button>
                <button className={buttonVariants()}>PDF</button>
            </div>
        </div>
    );
};
export default DownloadComponent;
