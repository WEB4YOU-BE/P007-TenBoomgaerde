"use server"
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

interface IndexActionsProps {
    id: string;
    tableName: string;
}

export async function Delete({id, tableName}: IndexActionsProps) {
    const supabase = createServerComponentClient({cookies})
    await supabase.from(tableName).delete().match({'id': id})
}