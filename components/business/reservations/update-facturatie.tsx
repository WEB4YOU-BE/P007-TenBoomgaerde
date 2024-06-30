"use server"

import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";

interface IndexActionsProps {
    id: string;
    checked: boolean;
}

export async function UpdateFacturatie({id, checked}: IndexActionsProps) {
    const supabase = createClient()
    await supabase.from("reservations").update({gefactureerd: checked}).eq('id', id)
}