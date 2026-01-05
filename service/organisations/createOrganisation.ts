import { TablesInsert } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface CreateOrganisationProps {
    organisation: TablesInsert<"organizations">;
}

const createOrganisation = async ({
    organisation,
}: CreateOrganisationProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("organizations")
        .insert(organisation)
        .select()
        .single();

    if (error) throw error;

    return data;
};

export default createOrganisation;
export type { CreateOrganisationProps };
