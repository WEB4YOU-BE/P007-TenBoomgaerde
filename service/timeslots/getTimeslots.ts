import createClient from "@/utils/supabase/client";

interface GetTimeslotsProps {
    signal: AbortSignal;
}
type GetTimeslotsResponse = Awaited<ReturnType<typeof getTimeslots>>;
const getTimeslots = async ({ signal }: GetTimeslotsProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("timeslots")
        .select("*")
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    return data;
};

export default getTimeslots;
export type { GetTimeslotsResponse };
