import { format } from "date-fns";
import { nlBE } from "date-fns/locale";

import sendReservationAccessCodeEmail from "@/service/email/sendReservationAccessCodeEmail";
import sendReservationDeclinedEmail from "@/service/email/sendReservationDeclinedEmail";
import { TablesUpdate } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateReservationsStatusProps {
    reservationIds: NonNullable<TablesUpdate<"reservations">["id"]>[];
    signal: AbortSignal;
    status: TablesUpdate<"reservations">["status"];
}
type UpdateReservationsStatusResponse = Awaited<
    ReturnType<typeof updateReservationsStatus>
>;
const updateReservationsStatus = async ({
    reservationIds,
    signal,
    status,
}: UpdateReservationsStatusProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .update({ status })
        .in("id", reservationIds)
        .select()
        .abortSignal(signal);

    if (error && error instanceof Error) throw error;

    // If status is set to ACCEPTED, send access code emails
    if (status === "ACCEPTED" && Array.isArray(data)) {
        for (const reservation of data) {
            try {
                // Fetch booker details
                const { data: bookerData, error: bookerError } = await supabase
                    .from("users")
                    .select("email, firstname, lastname")
                    .eq("id", reservation.booker ?? "")
                    .abortSignal(signal)
                    .single();

                if (bookerError || !bookerData.email) {
                    continue;
                }

                // Format reservation number as YYYY-NNNN
                const formattedReservationNumber = `${reservation.reservation_year.slice(0, 4)}-${String(reservation.reservation_number).padStart(4, "0")}`;

                // Format start date
                const startDate = reservation.start
                    ? new Date(reservation.start)
                    : null;
                const dateFNSLocale = nlBE;
                const formattedStartDate = startDate
                    ? format(startDate, "Pp", { locale: dateFNSLocale })
                    : "Niet opgegeven";

                const emailPayload = {
                    accessCode:
                        reservation.access_code !== null
                            ? String(reservation.access_code).padStart(4, "0")
                            : "0000",
                    bookerFirstName: bookerData.firstname ?? "",
                    bookerLastName: bookerData.lastname ?? "",
                    reservationNumber: formattedReservationNumber,
                    startDate: formattedStartDate,
                };

                await sendReservationAccessCodeEmail(
                    emailPayload,
                    bookerData.email
                );
            } catch {
                // Ignore email errors, don't fail the status update
            }
        }
    }

    // If status is set to DECLINED, send declined emails
    if (status === "DECLINED" && Array.isArray(data)) {
        for (const reservation of data) {
            try {
                // Fetch booker details
                const { data: bookerData, error: bookerError } = await supabase
                    .from("users")
                    .select("email, firstname, lastname")
                    .eq("id", reservation.booker ?? "")
                    .abortSignal(signal)
                    .single();

                if (bookerError || !bookerData.email) {
                    continue;
                }

                // Format reservation number as YYYY-NNNN
                const formattedReservationNumber = `${reservation.reservation_year.slice(0, 4)}-${String(reservation.reservation_number).padStart(4, "0")}`;

                // Format start date
                const startDate = reservation.start
                    ? new Date(reservation.start)
                    : null;
                const dateFNSLocale = nlBE;
                const formattedStartDate = startDate
                    ? format(startDate, "Pp", { locale: dateFNSLocale })
                    : "Niet opgegeven";

                const emailPayload = {
                    bookerFirstName: bookerData.firstname ?? "",
                    bookerLastName: bookerData.lastname ?? "",
                    reservationNumber: formattedReservationNumber,
                    startDate: formattedStartDate,
                };

                await sendReservationDeclinedEmail(
                    emailPayload,
                    bookerData.email
                );
            } catch {
                // Ignore email errors, don't fail the status update
            }
        }
    }

    return data;
};

export default updateReservationsStatus;
export type { UpdateReservationsStatusResponse };
