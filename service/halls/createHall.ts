import { TablesInsert } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface CreateHallProps {
    hall: TablesInsert<"halls">;
}

const createHall = async ({ hall }: CreateHallProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("halls")
        .insert(hall)
        .select()
        .single();

    if (error) throw error;

    return data;
};

export default createHall;
export type { CreateHallProps };
