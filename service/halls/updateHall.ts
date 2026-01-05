import { Tables, TablesUpdate } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateHallProps {
    id: Tables<"halls">["id"];
    hall: TablesUpdate<"halls">;
    signal?: AbortSignal;
}

const updateHall = async ({
    id,
    hall,
    signal = new AbortController().signal,
}: UpdateHallProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("halls")
        .update(hall)
        .eq("id", id)
        .abortSignal(signal);

    if (error) throw error;

    return data;
};

export default updateHall;
export type { UpdateHallProps };
