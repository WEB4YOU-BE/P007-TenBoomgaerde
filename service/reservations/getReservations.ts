import createClient from "@/utils/supabase/client";

interface GetReservationsProps {
    signal: AbortSignal;
}
type GetReservationsResponse = Awaited<ReturnType<typeof getReservations>>;
const getReservations = async ({ signal }: GetReservationsProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select("*, booker(*), organization(*), reservations_halls(hall(*))")
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    return data;
};

export default getReservations;
export type { GetReservationsResponse };
