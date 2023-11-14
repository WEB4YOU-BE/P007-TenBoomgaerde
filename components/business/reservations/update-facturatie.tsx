"use server"

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

interface IndexActionsProps {
    id: string;
    checked: boolean;
}

export async function UpdateFacturatie({id, checked}: IndexActionsProps) {
    const supabase = createServerComponentClient({cookies})
    await supabase.from("reservations").update({gefactureerd: checked}).eq('id', id)
}