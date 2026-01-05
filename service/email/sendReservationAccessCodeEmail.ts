"use server";

import ReservationAccessCodeEmail, {
    ReservationAccessCodeEmailProps,
} from "@/emails/ReservationAccessCodeEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_SEND_KEY);

const sendReservationAccessCodeEmail = async (
    {
        accessCode,
        bookerFirstName,
        bookerLastName,
        reservationNumber,
        startDate,
    }: ReservationAccessCodeEmailProps,
    recipientEmail: string
) => {
    const { data, error } = await resend.emails.send({
        from: "Ten Boomgaerde <info@vzwtenboomgaerdelichtervelde.be>",
        react: ReservationAccessCodeEmail({
            accessCode,
            bookerFirstName,
            bookerLastName,
            reservationNumber,
            startDate,
        }),
        subject: `Toegangscode voor reservatie ${reservationNumber} - Ten Boomgaerde`,
        to: [recipientEmail],
    });

    if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
};

export default sendReservationAccessCodeEmail;
