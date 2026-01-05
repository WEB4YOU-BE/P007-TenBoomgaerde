import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface GetProductByIdProps {
    id: string;
    signal?: AbortSignal;
}

type GetProductByIdResponse = Tables<"products">;

const getProductById = async ({
    id,
}: GetProductByIdProps): Promise<GetProductByIdResponse> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .select()
        .eq("id", id)
        .limit(1)
        .single();

    if (error) throw error;

    return data;
};

export default getProductById;
export type { GetProductByIdProps, GetProductByIdResponse };
