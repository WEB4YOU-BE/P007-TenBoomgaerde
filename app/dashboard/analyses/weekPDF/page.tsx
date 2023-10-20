import dynamic from 'next/dynamic'
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";

const PDF = dynamic(() => import('../../../../components/pdf/pdf'), {
    ssr: false
})

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
    const query = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname, phone), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status`).gte('start_date', formatDate({date: getWeekDates().start})).lte('end_date', formatDate({date: getWeekDates().end}))
    const reservations: DbResult<typeof query> = await query

    if (!reservations.data) return undefined

    return <main className={"w-full h-full"}>
        <PDF reservations={reservations.data}/>
    </main>
}