import createClient from "@/utils/supabase/client";

interface AddMemberToOrganisationProps {
    email: string;
    organisationId: string;
}

const addMemberToOrganisation = async ({
    email,
    organisationId,
}: AddMemberToOrganisationProps) => {
    const supabase = createClient();

    // Verify the current user is authenticated and is a member of this organisation
    const currentUser = await supabase.auth.getUser();
    if (!currentUser.data.user?.id) throw new Error("User not authenticated");

    const { data: membership } = await supabase
        .from("users_organizations")
        .select("user")
        .eq("organization", organisationId)
        .eq("user", currentUser.data.user.id)
        .single();

    if (!membership) {
        throw new Error("You are not a member of this organisation");
    }

    // Find the user by email
    const { data: user } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

    if (!user) {
        throw new Error("Geen gebruiker gevonden met dit e-mailadres");
    }

    // Check if the user is already a member
    const { data: existingMembership } = await supabase
        .from("users_organizations")
        .select("user")
        .eq("organization", organisationId)
        .eq("user", user.id)
        .single();

    if (existingMembership) {
        throw new Error("Deze gebruiker is al lid van de organisatie");
    }

    // Add the user to the organisation
    const { error: insertError } = await supabase
        .from("users_organizations")
        .insert({ organization: organisationId, user: user.id });

    if (insertError) throw insertError;
};

export default addMemberToOrganisation;
export type { AddMemberToOrganisationProps };
