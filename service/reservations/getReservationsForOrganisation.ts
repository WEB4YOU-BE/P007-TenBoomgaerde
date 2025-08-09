import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface GetReservationsForOrganisationProps {
    organisationId: Tables<"categories">["id"];
    signal: AbortSignal;
}
type GetReservationsForOrganisationResponse = Awaited<
    ReturnType<typeof getReservationsForOrganisation>
>;
const getReservationsForOrganisation = async ({
    organisationId,
    signal,
}: GetReservationsForOrganisationProps) => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    if (!user.data.user?.id) throw new Error("User not authenticated");

    // Fetch organisation where the ID matches and the user is a member
    const { data: organisation, error: orgError } = await supabase
        .from("users_organizations")
        .select("organization")
        .eq("organization", organisationId)
        .eq("user", user.data.user.id)
        .abortSignal(signal)
        .single();
    if (orgError && orgError instanceof Error) throw orgError;
    if (!organisation)
        throw new Error("User is not a member of the organisation");

    // ...continue with fetching reservations or other logic...
    const { data: reservations, error: resError } = await supabase
        .from("reservations")
        .select("*, booker(*), organization(*), reservations_halls(hall(*))")
        .eq("organization", organisationId)
        .abortSignal(signal);
    if (resError && resError instanceof Error) throw resError;

    return reservations;
};

export default getReservationsForOrganisation;
export type { GetReservationsForOrganisationResponse };
