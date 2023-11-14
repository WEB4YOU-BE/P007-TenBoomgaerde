import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {Printer} from "lucide-react";
import ReservationsTable from "@/components/business/reservations/reservations-table";

function getWeekDates() {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return {start, end}
}

function formatDate({date}: {
    date: Date
}) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd`).gte('start_date', formatDate({date: getWeekDates().start})).lte('end_date', formatDate({date: getWeekDates().end})).order('start_date')
    const reservations: DbResult<typeof query> = await query

    if (!reservations.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div className={"m-5 border border-gray-300 rounded-2xl p-2"}>
            <div className={"flex flex-col md:flex-row gap-2 p-4"}>
                <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Reservaties deze
                    week</h1>
                <Link href={"/dashboard/analyses/weekPDF"}
                      className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><Printer
                    size={16}/>Afdrukken</Link>
            </div>
            <ReservationsTable reservations={reservations.data}/>
        </div>
    </main>
}