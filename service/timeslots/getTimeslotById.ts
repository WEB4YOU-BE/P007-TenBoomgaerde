import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface GetTimeslotByIdProps {
    id: string;
    signal?: AbortSignal;
}

type GetTimeslotByIdResponse = Tables<"timeslots">;

const getTimeslotById = async ({
    id,
}: GetTimeslotByIdProps): Promise<GetTimeslotByIdResponse> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("timeslots")
        .select()
        .eq("id", id)
        .limit(1)
        .single();

    if (error) throw error;

    return data;
};

export default getTimeslotById;
export type { GetTimeslotByIdProps, GetTimeslotByIdResponse };
