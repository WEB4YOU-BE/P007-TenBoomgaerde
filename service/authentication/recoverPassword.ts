import createClient from "@/utils/supabase/client";

interface RecoverPasswordProps {
    email: string;
    siteURL?: string;
}
const recoverPassword = async ({ email, siteURL }: RecoverPasswordProps) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: new URL("/authentication/sign-in/", siteURL).toString(),
    });
    if (error && error instanceof Error) throw error;
    return data;
};

export default recoverPassword;
