import {DbResult} from "@/lib/database.types";
import SelectCalendarIndex from "@/components/Calendar/select-calendar-item";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/Dropdown-menu";
import {ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

export default async function SelectCalendar() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("rooms").select()
    const rooms: DbResult<typeof query> = await query

    if (!rooms.data) return undefined
    return <DropdownMenu>
        <DropdownMenuTrigger
            className={cn(buttonVariants({variant: "green"}), "flex flex-row w-[150px] my-4 justify-between")}>Kies uw
            zaal<ChevronDown/></DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                rooms.data.map((room) =>
                    <SelectCalendarIndex name={room.name} id={room.id}/>
                )
            }
        </DropdownMenuContent>
    </DropdownMenu>
}