import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import BloksTable from "@/components/business/reservations/bloks/bloks-table";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("bloks").select().order('start_hour')
    const bloks: DbResult<typeof query> = await query

    if (!bloks.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div>
            <div className={"flex flex-col md:flex-row gap-2 p-4"}>
                <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Blokken</h1>
                <Link href={"/dashboard/zalen/blokken/add"}
                      className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><PlusCircle size={16}/>Toevoegen</Link>
            </div>
            <BloksTable bloks={bloks.data}/>
        </div>
    </main>
}