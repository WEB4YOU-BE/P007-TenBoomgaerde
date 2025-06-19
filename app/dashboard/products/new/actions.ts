"use server";

import type { TablesInsert } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const createProduct = async ({
    product,
}: {
    product: TablesInsert<"products">;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase.from("products").insert(product);
    if (error) throw error;
    return data;
};
