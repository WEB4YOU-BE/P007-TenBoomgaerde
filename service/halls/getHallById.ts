import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface GetHallByIdProps {
    id: string;
    signal?: AbortSignal;
}

type GetHallByIdResponse = Tables<"halls">;

const getHallById = async ({
    id,
}: GetHallByIdProps): Promise<GetHallByIdResponse> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("halls")
        .select()
        .eq("id", id)
        .limit(1)
        .single();

    if (error) throw error;

    return data;
};

export default getHallById;
export type { GetHallByIdProps, GetHallByIdResponse };
