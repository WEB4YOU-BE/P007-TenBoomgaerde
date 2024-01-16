"use client"
import {Tables} from "@/lib/database.types";
import {Sheet} from "lucide-react";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import * as XLSX from "xlsx";

interface ReservationsProps {
    reservations: Tables<"reservations">[];
}

export default function ExportExcel({reservations}: ReservationsProps) {
    const handleDownload = () => {
        const rows = reservations.map((reservation) => ({
            Reservatienummer: reservation.reservation_year.substring(0, 4) + '-' + reservation.reservation_number,
            Startdatum: reservation.start_date,
            Einddatum: reservation.end_date,
            Startuur: reservation.start_hour.start_hour,
            Einduur: reservation.end_hour.end_hour,
            Zaal: reservation.rooms.name,
            Reserveerder: reservation.organizations === undefined || reservation.organizations === null ? reservation.users.firstname + " " + reservation.users.lastname : reservation.organizations.name,
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
            ["Reservatienummer", "Start datum", "Eind datum", "Start uur", "Eind uur", "Zaal", "Reserveerder", "Toegangscode", "Status", "Gefactureerd"],
        ]);

        XLSX.writeFile(workbook, "Reservaties.xlsx", {compression: true});
    };

    return <button className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")} onClick={handleDownload}>
        <Sheet/>
        Exporteren
    </button>
}