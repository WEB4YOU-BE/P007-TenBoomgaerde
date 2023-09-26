"use server"
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

interface CategoryRecordIndexActionsProps {
    id: string;
}

export async function deleteCategory({id}: CategoryRecordIndexActionsProps) {
    const supabase = createServerComponentClient({cookies})
    await supabase.from("categories").delete().match({'id': id})
}