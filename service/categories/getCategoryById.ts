import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface GetCategoryByIdProps {
    id: string;
    signal?: AbortSignal;
}

type GetCategoryByIdResponse = Tables<"categories">;

const getCategoryById = async ({
    id,
}: GetCategoryByIdProps): Promise<GetCategoryByIdResponse> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("categories")
        .select()
        .eq("id", id)
        .limit(1)
        .single();

    if (error) throw error;

    return data;
};

export default getCategoryById;
export type { GetCategoryByIdProps, GetCategoryByIdResponse };
