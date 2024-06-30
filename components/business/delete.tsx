"use server"
import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";

interface IndexActionsProps {
    id: string;
    tableName: string;
}

export async function Delete({id, tableName}: IndexActionsProps) {
    const supabase = createClient()
    await supabase.from(tableName).delete().match({'id': id})
}