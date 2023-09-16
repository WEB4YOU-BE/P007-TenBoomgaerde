import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import RoomsTable from "@/components/business/rooms/rooms-table";
import {DbResult} from "@/lib/database.types";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("rooms").select()
    const rooms: DbResult<typeof query> = await query

    if (!rooms.data) return undefined

    return <main className={"w-full"}>

    <RoomsTable rooms={rooms.data}/>
    </main>
}