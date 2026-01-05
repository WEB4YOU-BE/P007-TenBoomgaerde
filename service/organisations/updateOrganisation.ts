import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateOrganisationProps {
    id: string;
    organisation: Partial<Tables<"organizations">>;
}

const updateOrganisation = async ({
    id,
    organisation,
}: UpdateOrganisationProps) => {
    const supabase = createClient();
    const { error } = await supabase
        .from("organizations")
        .update(organisation)
        .eq("id", id);

    if (error) throw error;
};

export default updateOrganisation;
export type { UpdateOrganisationProps };
