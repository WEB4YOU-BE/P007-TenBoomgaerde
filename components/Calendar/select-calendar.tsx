import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/Select";
import {DbResult} from "@/lib/database.types";
import SelectCalendarIndex from "@/components/Calendar/select-calendar-item";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";


export default async function SelectCalendar() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("rooms").select()
    const rooms: DbResult<typeof query> = await query

    if (!rooms.data) return undefined
    return <Select>
        <SelectTrigger className={"w-[180px] my-4"}>
            <SelectValue placeholder={"Kies uw zaal"}/>
        </SelectTrigger>
        <SelectContent>
            {
                rooms.data.map((room) =>
                    <SelectCalendarIndex name={room.name} id={room.id}/>
                )
            }
        </SelectContent>
    </Select>

}