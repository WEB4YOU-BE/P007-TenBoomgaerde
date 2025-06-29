import createClient from "@/utils/supabase/client";

interface GetReservationsProps {
    signal: AbortSignal;
}
type GetReservationsResponse = Awaited<ReturnType<typeof getReservations>>;
const getReservations = async ({ signal }: GetReservationsProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations_halls")
        .select(
            `
            reservation (
                id,
                start,
                end,
                status,
                booker ( * ),
                organization ( * )
            ),
            hall ( * )
            `
        )
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;

    type Reservation = NonNullable<typeof data>[number]["reservation"];
    type Hall = NonNullable<typeof data>[number]["hall"];

    const mappedData = data?.reduce(
        (acc, reservation_hall) => {
            const { hall, reservation } = reservation_hall;
            if (!hall || !reservation) return acc;

            const existing = acc.find(
                (item) => item.reservation.id === reservation.id
            );
            if (existing) existing.reservation.halls.push(hall);
            else acc.push({ reservation: { ...reservation, halls: [hall] } });

            return acc;
        },
        [] as Array<{ reservation: Reservation & { halls: Hall[] } }>
    );
    const count = mappedData?.length ?? 0;

    return { count, data: mappedData };
};

export default getReservations;
export type { GetReservationsResponse };
