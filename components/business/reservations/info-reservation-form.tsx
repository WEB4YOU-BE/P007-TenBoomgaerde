import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import React from "react";
import SelectStatus from "@/components/business/reservations/select-status";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface ReservationIndexProps {
    id: string;
}


export default async function InfoReservationForm({id}: ReservationIndexProps) {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname, phone, email), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status`).eq('id', id)
    const reservation: DbResult<typeof query> = await query

    if (!reservation.data) return undefined

    return <main>
        <div className={"grid lg:grid-cols-2 p-2 gap-8"}>
            <div className={"flex flex-row gap-4 col-span-2 mb-16 justify-between"}>
                <div className={"pt-2"}>
                    <span className={"font-bold uppercase"}>Reservatienummer: </span>
                    <span>{reservation.data[0].reservation_year.substring(0, 4) + '-' + reservation.data[0].reservation_number}</span>
                </div>
                <div className={"ml-auto"}>
                    <SelectStatus id={reservation.data[0].id} status={reservation.data[0].status}/>
                </div>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Startdatum:</span>
                <span>{reservation.data[0].start_date}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Einddatum:</span>
                <span>{reservation.data[0].end_date}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Startuur:</span>
                <span>{/*reservation.data[0].start_hour.start_hour.substring(0, 5)*/}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Einduur:</span>
                <span>{/*reservation.data[0].end_hour.end_hour.substring(0, 5)*/}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Zaal:</span>
                <span>{/*reservation.data[0].rooms.name*/}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Code:</span>
                {reservation.data[0].access_code === null ? 'Onbekend' : reservation.data[0].access_code}
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Voornaam:</span>
                <span>{/*reservation.data[0].users.firstname*/}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Achternaam:</span>
                <span>{/*reservation.data[0].users.lastname*/}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Telefoonnummer:</span>
                <span>{/*reservation.data[0].users.phone*/}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Email:</span>
                <span>{/*reservation.data[0].users.email*/}</span>
            </div>

            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Producten:</span>
                <span>{/*reservation.data[0].products.name*/}</span>
            </div>
        </div>
        <Link href={"/dashboard/reservaties"} className={cn(buttonVariants({variant: "green"}), "mt-12")}>Terug naar
            reservatielijst</Link>

    </main>

}