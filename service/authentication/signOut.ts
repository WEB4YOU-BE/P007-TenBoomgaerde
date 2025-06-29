import createClient from "@/utils/supabase/client";

const signOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error && error instanceof Error) throw error;
};

export default signOut;
