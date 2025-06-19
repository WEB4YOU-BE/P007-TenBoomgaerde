"use server";

import createClient from "@/utils/supabase/server";

export const changePassword = async (password: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return data;
};
