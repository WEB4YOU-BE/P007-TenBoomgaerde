"use server"

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

interface IndexActionsProps {
    id: string;
    nieuweStatus: string;
}

export async function UpdateStatus({id, nieuweStatus}: IndexActionsProps) {
    const supabase = createServerComponentClient({cookies})
    await supabase.from("reservations").update({'status': nieuweStatus}).eq('id', id)
}