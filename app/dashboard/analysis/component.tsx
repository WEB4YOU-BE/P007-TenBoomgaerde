"use client";

import * as XLSX from "@e965/xlsx";
import Link from "next/link";
import React, { FC } from "react";

import { getOrganisationById } from "@/app/dashboard/organisations/[id]/actions";
import { getUserById } from "@/app/dashboard/reservations/[id]/actions";
import { Tables } from "@/types/supabase/database";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

interface Props {
    reservations: Tables<"reservations">[];
    text: string;
}
const DownloadComponent: FC<Props> = ({ reservations, text }) => {
    const handleDownloadExcel = async () => {
        const users = await Promise.all(
            reservations.map((reservation) =>
                getUserById(reservation.user_id || "")
            )
        );
        const organizations = await Promise.all(
            reservations.map((reservation) =>
                getOrganisationById(reservation.organization_id || "")
            )
        );

        const rows = reservations.map((reservation) => {
            const user = users.find((user) => user?.id === reservation.user_id);
            const reserverName = user
                ? `${user.firstname} ${user.lastname} (${user.email})`
                : "Onbekend";
            return {
                Eind: reservation.end
                    ? new Date(reservation.end).toLocaleString("nl-NL", {
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                      })
                    : "Onbekend",
                Gefactureerd: reservation.gefactureerd ? "Ja" : "Nee",
                Organisatie:
                    organizations.find(
                        (org) => org?.id === reservation.organization_id
                    )?.name || "Onbekend",
                Reservatienummer:
                    reservation.reservation_year.substring(0, 4) +
                    "-" +
                    reservation.reservation_number,
                Reserveerder: reserverName,
                Start: reservation.start
                    ? new Date(reservation.start).toLocaleString("nl-NL", {
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                      })
                    : "Onbekend",
                Status: reservation.status,
                Toegangscode:
                    reservation.access_code === null
                        ? "Onbekend"
                        : reservation.access_code,
            };
        });

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(rows);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Reservations");

        // customize header names
        XLSX.utils.sheet_add_aoa(worksheet, [
            [
                "Reservatienummer",
                "Start",
                "Eind",
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
            </div>
        </div>
    );
};
export default DownloadComponent;
