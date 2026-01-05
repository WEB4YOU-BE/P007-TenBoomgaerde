import createClient from "@/utils/supabase/client";

interface GetProductByIdProps {
    id: string;
    signal?: AbortSignal;
}

const getProductById = async ({ id }: GetProductByIdProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .select("*, category(*)")
        .eq("id", id)
        .limit(1)
        .single();

    if (error) throw error;

    return data;
};

export default getProductById;
export type { GetProductByIdProps };
