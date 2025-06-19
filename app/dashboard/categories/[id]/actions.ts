"use server";

import type { TablesUpdate } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const getCategoryById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("categories")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};

export const updateCategoryById = async ({
    category,
    id,
}: {
    category: TablesUpdate<"categories">;
    id: string;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("categories")
        .update(category)
        .eq("id", id);
    if (error) throw error;
    return data;
};
