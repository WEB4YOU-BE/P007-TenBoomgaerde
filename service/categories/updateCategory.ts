import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateCategoryProps {
    category: Partial<Tables<"categories">>;
    id: string;
}

const updateCategory = async ({ category, id }: UpdateCategoryProps) => {
    const supabase = createClient();
    const { error } = await supabase
        .from("categories")
        .update(category)
        .eq("id", id);

    if (error) throw error;
};

export default updateCategory;
export type { UpdateCategoryProps };
