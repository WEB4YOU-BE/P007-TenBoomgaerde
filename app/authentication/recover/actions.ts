"use server";

import createClient from "@/utils/supabase/server";

export const resetPasswordForEmail = async ({
    email,
    siteUrl,
}: {
    email: string;
    siteUrl: string;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: new URL(
            "/authentication/change-password/",
            siteUrl
        ).toString(),
    });
    if (error) throw error;
    return data;
};
