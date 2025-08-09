import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface GetMembersForOrganisationProps {
    organisationId: Tables<"categories">["id"];
    signal: AbortSignal;
}
type GetMembersForOrganisationResponse = Awaited<
    ReturnType<typeof getMembersForOrganisation>
>;
const getMembersForOrganisation = async ({
    organisationId,
    signal,
}: GetMembersForOrganisationProps) => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    if (!user.data.user?.id) throw new Error("User not authenticated");

    // Fetch user_organization where the organization and user match, joining user
    const { data, error } = await supabase
        .from("users_organizations")
        .select("user(*)")
        .eq("organization", organisationId)
        .eq("user", user.data.user.id)
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;
    if (!data) throw new Error("User is not a member of the organisation");

    return data.map((entry) => entry.user);
};

export default getMembersForOrganisation;
export type { GetMembersForOrganisationResponse };
