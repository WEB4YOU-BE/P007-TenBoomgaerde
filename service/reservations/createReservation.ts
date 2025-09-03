import { TablesInsert } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface CreateReservationProps {
    bookerId: TablesInsert<"reservations">["booker"];
    end: TablesInsert<"reservations">["end"];
    hallIds: TablesInsert<"reservations_halls">["hall"][];
    isParty: TablesInsert<"reservations">["is_party"];
    organisationId: TablesInsert<"reservations">["organization"];
    remarks: TablesInsert<"reservations">["remarks"];
    signal: AbortSignal;
    start: TablesInsert<"reservations">["start"];
}
type CreateReservationResponse = Awaited<ReturnType<typeof createReservation>>;
const createReservation = async ({
    bookerId,
    end,
    hallIds,
    isParty,
    organisationId,
    remarks,
    signal,
    start,
}: CreateReservationProps) => {
    const supabase = createClient();

    // Find the highest reservation_number:
    const { data: latestReservation, error: latestReservationError } =
        await supabase
            .from("reservations")
            .select("reservation_number")
            .order("reservation_number", { ascending: false })
            .abortSignal(signal);
    if (latestReservationError && latestReservationError instanceof Error)
        throw latestReservationError;
    const reservationNumber = latestReservation?.at(0)?.reservation_number ?? 0;

    // Get the current reservation year as a string 'YYYY-01-01':
    const currentYear = new Date().getFullYear();
    const currentReservationYear = `${String(currentYear)}-01-01`;

    // Create reservation itself:
    const { data: reservation, error: reservationError } = await supabase
        .from("reservations")
        .insert({
            booker: bookerId,
            end,
            is_party: isParty,
            organization: organisationId,
            remarks,
            reservation_number: reservationNumber + 1,
            reservation_year: currentReservationYear,
            start,
        })
        .select()
        .abortSignal(signal)
        .single();
    if (reservationError && reservationError instanceof Error)
        throw reservationError;
    if (!reservation) throw new Error("Reservation creation failed");

    // Create connection between reservation and halls:
    const { error: hallsError } = await supabase
        .from("reservations_halls")
        .insert(
            hallIds.map((hallId) => ({
                hall: hallId,
                reservation: reservation.id,
            }))
        )
        .abortSignal(signal);
    if (hallsError && hallsError instanceof Error) throw hallsError;

    return reservation;
};

export default createReservation;
export type { CreateReservationProps, CreateReservationResponse };
