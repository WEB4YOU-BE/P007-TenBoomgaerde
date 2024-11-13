"use server";

import type { TablesInsert } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const createCategory = async ({
    category,
}: {
    category: TablesInsert<"categories">;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase.from("categories").insert(category);
    if (error) throw error;
    return data;
};
