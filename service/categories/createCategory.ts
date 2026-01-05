import { TablesInsert } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface CreateCategoryProps {
    category: TablesInsert<"categories">;
}

const createCategory = async ({ category }: CreateCategoryProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("categories")
        .insert(category)
        .select()
        .single();

    if (error) throw error;

    return data;
};

export default createCategory;
export type { CreateCategoryProps };
