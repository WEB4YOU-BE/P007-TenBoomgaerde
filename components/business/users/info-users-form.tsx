import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import React from "react";
import ChangeAdmin from "@/components/business/users/change-admin";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import ReservationsTable from "@/components/business/reservations/reservations-table";

interface UserIndexProps {
    id: string;
}

export default async function InfoUserForm({id}: UserIndexProps) {
    const supabase = createServerComponentClient({cookies})
    const queryUser = supabase.from("users").select(`*`).eq('id', id)
    const user: DbResult<typeof queryUser> = await queryUser
    const queryReservation = supabase.from("reservations").select(`id, reservation_year, reservation_number, users!inner(id, firstname, lastname), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd, organizations(name)`).eq('users.id', id)
    const reservations: DbResult<typeof queryReservation> = await queryReservation

    if (!user.data) return undefined
    if (!reservations.data) return undefined

    const postcode = user.data[0].postcode ?? ""
    const gemeente = user.data[0].city ?? ""

    return <div>
        <div className={"grid lg:grid-cols-2 p-2 gap-8"}>
            <div className={"lg:col-span-2"}>
                <div className={"flex flex-row gap-4  lg:mb-16 lg:justify-end"}>
                    <div className={"lg:ml-auto flex flex-row gap-4"}>
                        <p className={"font-bold uppercase"}>Administrator?</p>
                        <ChangeAdmin id={user.data[0].id} isAdmin={user.data[0].is_admin} email={user.data[0].email}/>
                    </div>
                </div>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Voornaam:</span>
                <span>{user.data[0].firstname ?? ""}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Familienaam:</span>
                <span>{user.data[0].lastname ?? ""}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Gsm-nummer:</span>
                <span>{user.data[0].phone ?? ""}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Emailadres:</span>
                <span>{user.data[0].email ?? ""}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Adres:</span>
                <span>{user.data[0].street ?? ""}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Gemeente:</span>
                <span>{postcode + " " + gemeente}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Type klant:</span>
                <span>{user.data[0].type ?? ""}</span>
            </div>
        </div>
        <Link href={"/dashboard/gebruikers"} className={cn(buttonVariants({variant: "secondary"}), "mt-12")}>Terug naar
            gebruikerslijst</Link>
        <div className={"my-5 border border-gray-300 rounded-2xl p-2"}>
            <div className={"flex flex-col md:flex-row gap-2 p-4"}>
                <h1 className={"text-3xl font-extrabold tracking-tight md:flex-grow"}>Reservaties</h1>
            </div>
            {!reservations.data === undefined || reservations.data.length === 0 ? (
                <h3 className={"text-xl p-4"}>
                    {user.data[0].firstname ?? "Deze gebruiker"} heeft geen reservaties
                </h3>
            ) : (
                <ReservationsTable reservations={reservations.data}/>
            )}
        </div>
    </div>
}