import createClient from "@/utils/supabase/client";

interface RequestOrganisationProps {
    name: string;
    userId: string;
}

const requestOrganisation = async ({
    name,
    userId,
}: RequestOrganisationProps) => {
    const supabase = createClient();

    // Create the organisation (status defaults to PENDING in DB)
    const { data: organisation, error: orgError } = await supabase
        .from("organizations")
        .insert({ name, vat: "" })
        .select()
        .single();

    if (orgError) throw orgError;

    // Link the user to the organisation
    const { error: linkError } = await supabase
        .from("users_organizations")
        .insert({ organization: organisation.id, user: userId });

    if (linkError) throw linkError;

    return organisation;
};

export default requestOrganisation;
export type { RequestOrganisationProps };
