"use server";

import createClient from "@/utils/supabase/server";

export const getCategoryById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("categories")
        .select()
        .eq("id", id);
    if (error) throw error;
    return data;
};
