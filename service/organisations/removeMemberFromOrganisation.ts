import createClient from "@/utils/supabase/client";

interface RemoveMemberFromOrganisationProps {
    organisationId: string;
    userId: string;
}

const removeMemberFromOrganisation = async ({
    organisationId,
    userId,
}: RemoveMemberFromOrganisationProps) => {
    const supabase = createClient();

    // Verify the current user is authenticated and is a member of this organisation
    const currentUser = await supabase.auth.getUser();
    if (!currentUser.data.user?.id) throw new Error("User not authenticated");

    const { data: membership, error: membershipError } = await supabase
        .from("users_organizations")
        .select("user")
        .eq("organization", organisationId)
        .eq("user", currentUser.data.user.id)
        .single();

    if (membershipError || !membership.user) {
        throw new Error("You are not a member of this organisation");
    }

    // Prevent users from removing themselves
    if (userId === currentUser.data.user.id) {
        throw new Error("Je kunt jezelf niet uit de organisatie verwijderen");
    }

    // Remove the user from the organisation
    const { error: deleteError } = await supabase
        .from("users_organizations")
        .delete()
        .eq("organization", organisationId)
        .eq("user", userId);

    if (deleteError) throw deleteError;
};

export default removeMemberFromOrganisation;
export type { RemoveMemberFromOrganisationProps };
