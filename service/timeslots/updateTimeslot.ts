import { Tables, TablesUpdate } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateTimeslotProps {
    id: Tables<"timeslots">["id"];
    timeslot: TablesUpdate<"timeslots">;
    signal?: AbortSignal;
}

const updateTimeslot = async ({
    id,
    timeslot,
    signal = new AbortController().signal,
}: UpdateTimeslotProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("timeslots")
        .update(timeslot)
        .eq("id", id)
        .abortSignal(signal);

    if (error) throw error;

    return data;
};

export default updateTimeslot;
export type { UpdateTimeslotProps };
