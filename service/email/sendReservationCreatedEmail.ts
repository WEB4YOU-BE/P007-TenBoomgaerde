"use server";

import ReservationCreatedEmail, {
    ReservationCreatedEmailProps,
} from "@/emails/ReservationCreatedEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_SEND_KEY);

const sendReservationCreatedEmail = async (
    {
        bookerFirstName,
        bookerLastName,
        endDate,
        hallNames,
        isParty,
        organisationName,
        remarks,
        reservationNumber,
        startDate,
    }: ReservationCreatedEmailProps,
    recipientEmail: string
) => {
    const { data, error } = await resend.emails.send({
        from: "Ten Boomgaerde <info@vzwtenboomgaerdelichtervelde.be>",
        react: ReservationCreatedEmail({
            bookerFirstName,
            bookerLastName,
            endDate,
            hallNames,
            isParty,
            organisationName,
            remarks,
            reservationNumber,
            startDate,
        }),
        subject: `Reservatie ${reservationNumber} ontvangen - Ten Boomgaerde`,
        to: [recipientEmail],
    });

    if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
};

export default sendReservationCreatedEmail;
