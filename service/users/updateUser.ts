import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateUserProps {
    id: string;
    user: Partial<Omit<Tables<"users">, "email" | "id">>;
}

const updateUser = async ({ id, user }: UpdateUserProps) => {
    const supabase = createClient();
    const { error } = await supabase.from("users").update(user).eq("id", id);

    if (error) throw error;
};

export default updateUser;
export type { UpdateUserProps };
