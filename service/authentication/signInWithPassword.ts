import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

import createClient from "@/utils/supabase/client";

interface SignInWithPasswordProps {
    credentials: SignInWithPasswordCredentials;
}
const signInWithPassword = async ({ credentials }: SignInWithPasswordProps) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error && error instanceof Error) throw error;
    return data;
};

export default signInWithPassword;
