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
    reservationYear: string;
    reservationNumber: number | null
    users: { id: string, firstname: string, lastname: string, phone: string, email: string };
    rooms: { name: string };
    start_date: string;
    end_date: string;
    start_hour: { start_hour: string };
    end_hour: { end_hour: string };
    accessCode: number | null;
    status: string;
    products: { name: string };
}

export default async function InfoReservationForm({
                                                      id,
                                                      reservationYear,
                                                      reservationNumber,
                                                      users,
                                                      rooms,
                                                      start_date,
                                                      end_date,
                                                      start_hour,
                                                      end_hour,
                                                      accessCode,
                                                      status,
                                                      products
                                                  }: ReservationIndexProps) {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname, phone, email), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status`).eq('id', id)
    const reservation: DbResult<typeof query> = await query

    if (!reservation.data) return undefined

    return <main>
        <div className={"grid grid-cols-1 lg:grid-cols-2 p-2 gap-8"}>
            <div className={"lg:col-span-2"}>
                <div className={"flex flex-col-reverse lg:flex-row gap-4  lg:mb-16 justify-between"}>
                    <div className={"pt-2"}>
                        <span className={"font-bold uppercase"}>Reservatienummer: </span>
                        <span>{reservationYear.substring(0, 4) + '-' + reservationNumber}</span>
                    </div>
                    <div className={"ml-auto"}>
                        <SelectStatus id={id} status={status}/>
                    </div>
                </div>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Startdatum:</span>
                <span>{start_date}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Einddatum:</span>
                <span>{end_date}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Startuur:</span>
                <span>{start_hour.start_hour.substring(0, 5)}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Einduur:</span>
                <span>{end_hour.end_hour.substring(0, 5)}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Zaal:</span>
                <span>{rooms.name}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Code:</span>
                {accessCode === null ? 'Onbekend' : accessCode}
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Voornaam:</span>
                <span>{users.firstname}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Achternaam:</span>
                <span>{users.lastname}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Telefoonnummer:</span>
                <span>{users.phone}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Email:</span>
                <span>{users.email}</span>
            </div>

            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Producten:</span>
                <span>{products.name}</span>
            </div>
        </div>
        <Link href={"/dashboard/reservaties"} className={cn(buttonVariants({variant: "green"}), "mt-12")}>Terug naar
            reservatielijst</Link>

    </main>

}