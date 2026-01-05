import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface GetOrganisationByIdProps {
    id: string;
    signal?: AbortSignal;
}

type GetOrganisationByIdResponse = Tables<"organizations">;

const getOrganisationById = async ({
    id,
}: GetOrganisationByIdProps): Promise<GetOrganisationByIdResponse> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("organizations")
        .select()
        .eq("id", id)
        .limit(1)
        .single();

    if (error) throw error;

    return data;
};

export default getOrganisationById;
export type { GetOrganisationByIdProps, GetOrganisationByIdResponse };
