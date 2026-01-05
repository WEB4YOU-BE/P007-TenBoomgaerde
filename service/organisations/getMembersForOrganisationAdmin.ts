import createClient from "@/utils/supabase/client";

interface GetMembersForOrganisationAdminProps {
    organisationId: string;
    signal?: AbortSignal;
}

type GetMembersForOrganisationAdminResponse = Awaited<
    ReturnType<typeof getMembersForOrganisationAdmin>
>;

const getMembersForOrganisationAdmin = async ({
    organisationId,
    signal,
}: GetMembersForOrganisationAdminProps) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("users_organizations")
        .select("user(*)")
        .eq("organization", organisationId)
        .abortSignal(signal ?? AbortSignal.timeout(10000));

    if (error) throw error;

    return data.map((entry) => entry.user);
};

export default getMembersForOrganisationAdmin;
export type { GetMembersForOrganisationAdminResponse };
