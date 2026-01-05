import { Tables, TablesUpdate } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateProductProps {
    id: Tables<"products">["id"];
    product: TablesUpdate<"products">;
    signal?: AbortSignal;
}

const updateProduct = async ({
    id,
    product,
    signal = new AbortController().signal,
}: UpdateProductProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id)
        .abortSignal(signal);

    if (error) throw error;

    return data;
};

export default updateProduct;
export type { UpdateProductProps };
