"use server";

import createClient from "@/utils/supabase/server";

export const resetPasswordForEmail = async (email: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "/authentication/sign-in/",
    });
    if (error) throw error;
    return data;
};
