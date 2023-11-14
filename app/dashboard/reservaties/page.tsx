import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {PlusCircle} from "lucide-react";
import ReservationsTable from "@/components/business/reservations/reservations-table";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd`).order('start_date')
    const reservations: DbResult<typeof query> = await query

    if (!reservations.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div className={"flex flex-col md:flex-row gap-2 p-4"}>
            <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Alle reservaties</h1>
            <Link href={"/reserveren"}
                  className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><PlusCircle
                size={16}/>Toevoegen</Link>
        </div>
        <ReservationsTable reservations={reservations.data}/>
    </main>
}