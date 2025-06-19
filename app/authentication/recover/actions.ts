"use server";

import createClient from "@/utils/supabase/server";

export const resetPasswordForEmail = async ({
    email,
    siteURL,
}: {
    email: string;
    siteURL: string;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: new URL(
            "/authentication/change-password/",
            siteURL
        ).toString(),
    });
    if (error) throw error;
    return data;
};
