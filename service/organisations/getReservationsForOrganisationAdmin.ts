import createClient from "@/utils/supabase/client";

interface GetReservationsForOrganisationAdminProps {
    organisationId: string;
    signal?: AbortSignal;
}

type GetReservationsForOrganisationAdminResponse = Awaited<
    ReturnType<typeof getReservationsForOrganisationAdmin>
>;

const getReservationsForOrganisationAdmin = async ({
    organisationId,
    signal,
}: GetReservationsForOrganisationAdminProps) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("reservations")
        .select("*, booker(*), organization(*), reservations_halls(hall(*))")
        .eq("organization", organisationId)
        .abortSignal(signal ?? AbortSignal.timeout(10000));

    if (error) throw error;

    return data;
};

export default getReservationsForOrganisationAdmin;
export type { GetReservationsForOrganisationAdminResponse };
