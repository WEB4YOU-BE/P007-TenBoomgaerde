import createClient from "@/utils/supabase/client";

interface IsAdminProps {
    userID: string;
}
const isAdmin = async ({ userID }: IsAdminProps) => {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("is_admin", { user_id: userID });
    if (error && error instanceof Error) throw error;
    return data ?? false;
};

export default isAdmin;
