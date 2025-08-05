import createClient from "@/utils/supabase/client";

interface GetMyOrganisationsProps {
    signal: AbortSignal;
}
type GetMyOrganisationsResponse = Awaited<
    ReturnType<typeof getMyOrganisations>
>;
const getMyOrganisations = async ({ signal }: GetMyOrganisationsProps) => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    if (!user.data.user?.id) throw new Error("User not authenticated");

    // Fetch organizations where the user is a member
    const { data, error } = await supabase
        .from("organizations")
        .select("*, users_organizations!inner(user)")
        .eq("users_organizations.user", user.data.user.id)
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    return data;
};

export default getMyOrganisations;
export type { GetMyOrganisationsResponse };
