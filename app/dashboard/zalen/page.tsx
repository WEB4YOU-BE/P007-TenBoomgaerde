import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import RoomsTable from "@/components/business/rooms/rooms-table";
import {DbResult} from "@/lib/database.types";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {PlusCircle} from "lucide-react";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("rooms").select()
    const rooms: DbResult<typeof query> = await query

    if (!rooms.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div className={"flex flex-col md:flex-row gap-2 p-4"}>
            <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Zalen</h1>
            <Link href={"/dashboard/zalen/add"} className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><PlusCircle size={16}/>Toevoegen</Link>
        </div>
        <RoomsTable rooms={rooms.data}/>
    </main>
}