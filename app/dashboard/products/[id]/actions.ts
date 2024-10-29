"use server";

import type { TablesUpdate } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const getProductById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};

export const updateProductById = async ({
    id,
    product,
}: {
    id: string;
    product: TablesUpdate<"products">;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id);
    if (error) throw error;
    return data;
};
