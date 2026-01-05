"use server";

import ReservationDeclinedEmail, {
    ReservationDeclinedEmailProps,
} from "@/emails/ReservationDeclinedEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_SEND_KEY);

const sendReservationDeclinedEmail = async (
    {
        bookerFirstName,
        bookerLastName,
        reservationNumber,
        startDate,
    }: ReservationDeclinedEmailProps,
    recipientEmail: string
) => {
    const { data, error } = await resend.emails.send({
        from: "Ten Boomgaerde <info@vzwtenboomgaerdelichtervelde.be>",
        react: ReservationDeclinedEmail({
            bookerFirstName,
            bookerLastName,
            reservationNumber,
            startDate,
        }),
        subject: `Reservatie ${reservationNumber} afgewezen - Ten Boomgaerde`,
        to: [recipientEmail],
    });

    if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
};

export default sendReservationDeclinedEmail;
