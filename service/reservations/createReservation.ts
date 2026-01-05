import { format, isSameDay } from "date-fns";
import { nlBE } from "date-fns/locale";

import sendReservationCreatedEmail from "@/service/email/sendReservationCreatedEmail";
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

    // Fetch booker details for email:
    let bookerEmail: string | null = null;
    let bookerFirstName: string | null = null;
    let bookerLastName: string | null = null;

    if (bookerId) {
        const { data: bookerData, error: bookerError } = await supabase
            .from("users")
            .select("email, firstname, lastname")
            .eq("id", bookerId)
            .abortSignal(signal)
            .single();
        if (bookerError && bookerError instanceof Error) throw bookerError;
        if (bookerData) {
            bookerEmail = bookerData.email;
            bookerFirstName = bookerData.firstname;
            bookerLastName = bookerData.lastname;
        }
    }

    // Fetch hall names for email:
    const { data: hallsData, error: hallsDataError } = await supabase
        .from("halls")
        .select("name")
        .in("id", hallIds)
        .abortSignal(signal);
    if (hallsDataError && hallsDataError instanceof Error) throw hallsDataError;
    const hallNames = hallsData?.map((hall) => hall.name) ?? [];

    // Fetch organisation name if applicable:
    let organisationName: string | null = null;
    if (organisationId) {
        const { data: orgData, error: orgError } = await supabase
            .from("organizations")
            .select("name")
            .eq("id", organisationId)
            .abortSignal(signal)
            .single();
        if (orgError && orgError instanceof Error) throw orgError;
        organisationName = orgData?.name ?? null;
    }

    // Format reservation number as YYYY-NNNN:
    const formattedReservationNumber = `${String(currentYear)}-${String(
        reservation.reservation_number
    ).padStart(4, "0")}`;

    // Format dates for email:
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;
    const dateFNSLocale = nlBE;
    const formattedStartDate = startDate
        ? format(startDate, "Pp", { locale: dateFNSLocale })
        : "Niet opgegeven";
    const formattedEndDate = endDate
        ? format(
              endDate,
              startDate && isSameDay(startDate, endDate) ? "p" : "Pp",
              { locale: dateFNSLocale }
          )
        : "Niet opgegeven";

    // Send confirmation email:
    if (bookerEmail) {
        try {
            await sendReservationCreatedEmail(
                {
                    bookerFirstName: bookerFirstName ?? "",
                    bookerLastName: bookerLastName ?? "",
                    endDate: formattedEndDate,
                    hallNames,
                    isParty: isParty ?? false,
                    organisationName,
                    remarks: remarks ?? null,
                    reservationNumber: formattedReservationNumber,
                    startDate: formattedStartDate,
                },
                bookerEmail
            );
        } catch (emailError) {
            // Log email error but don't fail the reservation creation
            console.error(
                "Failed to send reservation confirmation email:",
                emailError
            );
        }
    }

    return reservation;
};

export default createReservation;
export type { CreateReservationProps, CreateReservationResponse };
