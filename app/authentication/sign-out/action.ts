import createClient from "@/utils/supabase/client";

export const signOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};
