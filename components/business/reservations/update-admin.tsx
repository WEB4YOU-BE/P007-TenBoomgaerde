"use server"

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

interface IndexActionsProps {
    id: string;
    checked: boolean;
}

export async function UpdateAdmin({id, checked}: IndexActionsProps) {
    const supabase = createServerComponentClient({cookies})
    await supabase.from("users").update({is_admin: checked}).eq('id', id)
}