"use server";

import type { TablesInsert } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const createHall = async ({ hall }: { hall: TablesInsert<"rooms"> }) => {
    const supabase = createClient();
    const { data, error } = await supabase.from("rooms").insert(hall);
    if (error) throw error;
    return data;
};
