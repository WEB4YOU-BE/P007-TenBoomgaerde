import createClient from "@/utils/supabase/client";

interface AddMemberToOrganisationAdminProps {
    email: string;
    organisationId: string;
}

const addMemberToOrganisationAdmin = async ({
    email,
    organisationId,
}: AddMemberToOrganisationAdminProps) => {
    const supabase = createClient();

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

export default addMemberToOrganisationAdmin;
export type { AddMemberToOrganisationAdminProps };
