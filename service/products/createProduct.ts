import { TablesInsert } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface CreateProductProps {
    product: TablesInsert<"products">;
}

const createProduct = async ({ product }: CreateProductProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();

    if (error) throw error;

    return data;
};

export default createProduct;
export type { CreateProductProps };
