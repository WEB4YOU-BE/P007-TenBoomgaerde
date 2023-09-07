import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function RoomsTable() {
    const supabase = createServerComponentClient({cookies})
    const {data: rooms, error} = await supabase.from("rooms").select()

    return <pre>{JSON.stringify(rooms, null, 2)}</pre>
}