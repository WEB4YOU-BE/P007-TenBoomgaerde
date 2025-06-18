"use server";
import type { TablesUpdate } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const getUserById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};
export const getReservationByUserId = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select()
        .eq("user_id", id);
    if (error) throw error;
    return data;
};

export const updateUserById = async ({
    id,
    user,
}: {
    id: string;
    user: TablesUpdate<"users">;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("users")
        .update(user)
        .eq("id", id);
    if (error) throw error;
    return data;
};
