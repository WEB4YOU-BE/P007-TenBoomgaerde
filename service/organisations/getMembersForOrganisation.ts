import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface GetMembersForOrganisationProps {
    organisationId: Tables<"organizations">["id"];
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

    // First verify that the current user is a member of this organisation
    const { data: membership, error: membershipError } = await supabase
        .from("users_organizations")
        .select("user")
        .eq("organization", organisationId)
        .eq("user", user.data.user.id)
        .single();

    if (membershipError || !membership.user) {
        throw new Error("User is not a member of the organisation");
    }

    // Fetch all members of the organisation
    const { data, error } = await supabase
        .from("users_organizations")
        .select("user(*)")
        .eq("organization", organisationId)
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;
    if (!data) throw new Error("No members found");

    return data.map((entry) => entry.user);
};

export default getMembersForOrganisation;
export type { GetMembersForOrganisationResponse };
