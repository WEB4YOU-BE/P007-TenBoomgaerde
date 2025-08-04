import createClient from "@/utils/supabase/client";

interface SendPasswordResetProps {
    emails: string[];
    siteURL?: string;
}

const sendPasswordReset = async ({
    emails,
    siteURL,
}: SendPasswordResetProps) => {
    const supabase = createClient();
    return Promise.all(
        emails.map(async (email) => {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: new URL(
                    "/authentication/change-password/",
                    siteURL
                ).toString(),
            });
            if (error) throw error;
            return { email, success: true };
        })
    );
};

export default sendPasswordReset;
export type { SendPasswordResetProps };
