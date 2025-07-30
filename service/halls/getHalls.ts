import createClient from "@/utils/supabase/client";

interface GetHallsProps {
    signal: AbortSignal;
}
type GetHallsResponse = Awaited<ReturnType<typeof getHalls>>;
const getHalls = async ({ signal }: GetHallsProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("halls")
        .select()
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    return data;
};

export default getHalls;
export type { GetHallsResponse };
