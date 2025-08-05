import createClient from "@/utils/supabase/client";

interface GetMyReservationsProps {
    signal: AbortSignal;
}
type GetMyReservationsResponse = Awaited<ReturnType<typeof getMyReservations>>;
const getMyReservations = async ({ signal }: GetMyReservationsProps) => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    if (!user.data.user?.id) throw new Error("User not authenticated");

    // Fetch organization-ids the user is part of
    const { data: organizationIds, error: orgError } = await supabase
        .from("users_organizations")
        .select("organization")
        .eq("user", user.data.user.id)
        .abortSignal(signal);
    if (orgError && orgError instanceof Error) throw orgError;

    // Now fetch reservations for the user and their organizations
    const orgIds = organizationIds?.map((org) => org.organization) || [];
    const orgFilter = `organization.in.(${orgIds.join(",")})`;
    const bookerFilter = `booker.eq.${user.data.user.id}`;
    const { data, error } = await supabase
        .from("reservations")
        .select("*, booker(*), organization(*), reservations_halls(hall(*))")
        .or(`${orgFilter},${bookerFilter}`)
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    return data;
};

export default getMyReservations;
export type { GetMyReservationsResponse };
