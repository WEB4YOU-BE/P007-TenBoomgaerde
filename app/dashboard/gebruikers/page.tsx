import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import UsersTable from "@/components/business/users/users-table";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("users").select(`*`)
    const users: DbResult<typeof query> = await query

    if (!users.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div className={"flex flex-col md:flex-row gap-2 p-4"}>
            <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Gebruikers</h1>
        </div>
        <UsersTable users={users.data}/>
    </main>
}