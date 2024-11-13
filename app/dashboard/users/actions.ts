"use server";

import createClient from "@/utils/supabase/server";

export const fetchUsers = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("users").select();
    if (error) throw error;
    return data;
};
