import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

import createClient from "@/utils/supabase/client";

interface SignUpProps {
    credentials: Pick<
        Extract<SignUpWithPasswordCredentials, { email: string }>,
        "email" | "password"
    >;
    siteURL: string;
}
const signUp = async ({ credentials, siteURL }: SignUpProps) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
        ...credentials,
        options: {
            emailRedirectTo: new URL(
                "/account/personal-information/",
                siteURL
            ).toString(),
        },
    });
    if (error && error instanceof Error) throw error;
    return data;
};

export default signUp;
