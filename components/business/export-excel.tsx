"use client"
import {Tables} from "@/lib/database.types";
import {Sheet} from "lucide-react";
import { cn } from "@/utils/tailwindcss/MergeCN";
import {buttonVariants} from "@/components/atoms/button";
import * as XLSX from "xlsx";

interface ReservationsProps {
    reservations: Tables<"reservations">[];
}

export default function ExportExcel({reservations}: ReservationsProps) {

    const handleDownload = () => {
        const rows = reservations.map((reservation) => ({
            Reservatienummer: reservation.reservation_year.substring(0, 4) + '-' + reservation.reservation_number,
            Startdatum: new Date(reservation.start_date).toLocaleDateString("nl-NL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }),
            Einddatum: new Date(reservation.end_date).toLocaleDateString("nl-NL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }),
            Startuur: reservation.start_hour.start_hour,
            Einduur: reservation.end_hour.end_hour,
            Zaal: reservation.rooms.name,
            Reserveerder: reservation.users.firstname === null ? "" : reservation.users.firstname + " " + reservation.users.lastname,
            Organisatie: reservation.organizations === undefined || reservation.organizations === null ? "" : reservation.organizations.name,
            Toegangscode: reservation.access_code === null ? 'Onbekend' : reservation.access_code,
            Status: reservation.status,
            Gefactureerd: reservation.gefactureerd
        }));

        // create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(rows);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Reservations");

        // customize header names
        XLSX.utils.sheet_add_aoa(worksheet, [
            ["Reservatienummer", "Start datum", "Eind datum", "Start uur", "Eind uur", "Zaal", "Reserveerder", "Organisatie", "Toegangscode", "Status", "Gefactureerd"],
        ]);

        XLSX.writeFile(workbook, "Reservaties.xlsx", {compression: true});
    };

    return <button className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")} onClick={handleDownload}>
        <Sheet/>
        Exporteren
    </button>
}