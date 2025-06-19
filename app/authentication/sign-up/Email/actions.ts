"use server";

import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

import createClient from "@/utils/supabase/server";

export const signUpWithEmailCredentials = async ({
    credentials,
    siteUrl,
}: {
    credentials: Pick<
        Extract<SignUpWithPasswordCredentials, { email: string }>,
        "email" | "password"
    >;
    siteUrl?: string;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
        ...credentials,
        options: {
            emailRedirectTo: new URL("/account/", siteUrl).toString(),
        },
    });
    if (error) throw error;
    return data;
};
