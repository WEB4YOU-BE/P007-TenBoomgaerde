import createClient from "@/utils/supabase/client";

interface RemoveMemberFromOrganisationAdminProps {
    organisationId: string;
    userId: string;
}

const removeMemberFromOrganisationAdmin = async ({
    organisationId,
    userId,
}: RemoveMemberFromOrganisationAdminProps) => {
    const supabase = createClient();

    // Remove the user from the organisation
    const { error: deleteError } = await supabase
        .from("users_organizations")
        .delete()
        .eq("organization", organisationId)
        .eq("user", userId);

    if (deleteError) throw deleteError;
};

export default removeMemberFromOrganisationAdmin;
export type { RemoveMemberFromOrganisationAdminProps };
