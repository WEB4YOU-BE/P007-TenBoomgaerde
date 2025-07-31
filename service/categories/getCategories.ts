import createClient from "@/utils/supabase/client";

interface GetCategoriesProps {
    signal: AbortSignal;
}
type GetCategoriesResponse = Awaited<ReturnType<typeof getCategories>>;
const getCategories = async ({ signal }: GetCategoriesProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("categories")
        .select()
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    return data;
};

export default getCategories;
export type { GetCategoriesResponse };
