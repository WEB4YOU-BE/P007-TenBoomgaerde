import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import React from "react";
import ChangeAdmin from "@/components/business/users/change-admin";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";

interface UserIndexProps {
    id: string;
}

export default async function InfoUserForm({id}: UserIndexProps) {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("users").select(`*`).eq('id', id)
    const user: DbResult<typeof query> = await query

    if (!user.data) return undefined

    const postcode = user.data[0].postcode ?? ""
    const gemeente = user.data[0].city ?? ""

    return <div>
        <div className={"grid lg:grid-cols-2 p-2 gap-8"}>
            <div className={"flex flex-row gap-4 col-span-2 mb-16 justify-end"}>
                <div className={"ml-auto flex flex-row gap-4"}>
                    <p>Administrator?</p>
                    <ChangeAdmin id={user.data[0].id} isAdmin={user.data[0].is_admin} email={user.data[0].email}/>
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
        </div>
        <Link href={"/dashboard/gebruikers"} className={cn(buttonVariants({variant: "green"}), "mt-12")}>Terug naar
            gebruikerslijst</Link>
    </div>
}