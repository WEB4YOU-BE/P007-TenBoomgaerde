"use server"

import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";

interface IndexActionsProps {
    id: string;
    nieuweStatus: string;
}

export async function UpdateStatus({id, nieuweStatus}: IndexActionsProps) {
    const supabase = createClient()
    await supabase.from("reservations").update({'status': nieuweStatus}).eq('id', id)
}