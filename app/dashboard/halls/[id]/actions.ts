"use server";

import type { TablesUpdate } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const getHallById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("rooms")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};

export const updateHallById = async ({
    hall,
    id,
}: {
    hall: TablesUpdate<"rooms">;
    id: string;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("rooms")
        .update(hall)
        .eq("id", id);
    if (error) throw error;
    return data;
};
