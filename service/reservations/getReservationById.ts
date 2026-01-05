import createClient from "@/utils/supabase/client";

interface GetReservationByIdProps {
    id: string;
    signal?: AbortSignal;
}

type GetReservationByIdResponse = Awaited<
    ReturnType<typeof getReservationById>
>;

const getReservationById = async ({ id, signal }: GetReservationByIdProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select("*, booker(*), organization(*), reservations_halls(hall(*))")
        .eq("id", id)
        .abortSignal(signal ?? AbortSignal.timeout(5000))
        .limit(1)
        .single();

    if (error) throw error;

    return data;
};

export default getReservationById;
export type { GetReservationByIdProps, GetReservationByIdResponse };
