import { TablesInsert } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface CreateTimeslotProps {
    timeslot: TablesInsert<"timeslots">;
}

const createTimeslot = async ({ timeslot }: CreateTimeslotProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("timeslots")
        .insert(timeslot)
        .select()
        .single();

    if (error) throw error;

    return data;
};

export default createTimeslot;
export type { CreateTimeslotProps };
