import createClient from "@/utils/supabase/client";

interface GetOrganisationsProps {
    signal: AbortSignal;
}
type GetOrganisationsResponse = Awaited<ReturnType<typeof getOrganisations>>;
const getOrganisations = async ({ signal }: GetOrganisationsProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("organizations")
        .select(
            "*, users_organizations( users( id, firstname, lastname, email ) )"
        )
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    return data;
};

export default getOrganisations;
export type { GetOrganisationsResponse };
