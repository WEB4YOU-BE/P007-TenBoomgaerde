"use server";

import { createClient } from "@/utils/supabase/server";

export const resetPasswordForEmail = async (
    email: string,
) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "/account/recover-password/",
    });
    if (error) throw error;
    return data;
};
