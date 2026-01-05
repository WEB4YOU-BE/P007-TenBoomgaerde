import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface GetUserByIdProps {
    signal?: AbortSignal;
    userId: Tables<"users">["id"];
}

type GetUserByIdResponse = Tables<"users">;

const getUserById = async ({
    userId,
}: GetUserByIdProps): Promise<GetUserByIdResponse> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", userId)
        .limit(1)
        .single();

    if (error) throw error;

    return data;
};

export default getUserById;
export type { GetUserByIdProps, GetUserByIdResponse };
