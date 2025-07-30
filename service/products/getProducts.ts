import createClient from "@/utils/supabase/client";

interface GetProductsProps {
    signal: AbortSignal;
}
type GetProductsResponse = Awaited<ReturnType<typeof getProducts>>;
const getProducts = async ({ signal }: GetProductsProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .select("*, category(*)")
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    return data;
};

export default getProducts;
export type { GetProductsResponse };
