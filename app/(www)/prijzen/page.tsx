import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("products").select()
    const products: DbResult<typeof query> = await query

    if (!products.data) return undefined

    return <main className={"w-full min-h-[calc(100svh-72px)]"}>
        <div className={"container mx-auto"}></div>
        <h1 className={"text-5xl font-extrabold"}>Prijzen</h1>
    </main>
}