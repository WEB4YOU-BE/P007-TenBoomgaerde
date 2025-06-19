"use server";

import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

import createClient from "@/utils/supabase/server";

export const signInWithEmailCredentials = async (
    credentials: SignInWithPasswordCredentials
) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
    return data;
};
