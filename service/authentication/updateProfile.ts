import { Tables, TablesUpdate } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

const updateProfile = async ({
    id,
    signal = new AbortController().signal,
    user,
}: {
    id: Tables<"users">["id"];
    signal?: AbortSignal;
    user: TablesUpdate<"users">;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("users")
        .update(user)
        .eq("id", id)
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    return data;
};

export default updateProfile;
