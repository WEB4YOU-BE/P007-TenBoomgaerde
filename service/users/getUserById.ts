import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface GetUserByIdProps {
    userId: Tables<"users">["id"];
}
const getUserById = async ({ userId }: GetUserByIdProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", userId)
        .limit(1)
        .single();
    if (error && error instanceof Error) throw error;
    return data;
};

export default getUserById;
