import createClient from "@/utils/supabase/client";

interface GetUsersProps {
    signal: AbortSignal;
}
type GetUsersResponse = Awaited<ReturnType<typeof getUsers>>;
const getUsers = async ({ signal }: GetUsersProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("users")
        .select()
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    return data;
};

export default getUsers;
export type { GetUsersResponse };
