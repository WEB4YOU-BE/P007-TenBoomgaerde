"use server";

import { Resend } from "resend";

import ReservationCreatedEmail, {
    ReservationCreatedEmailProps,
} from "@/emails/ReservationCreatedEmail";

const resend = new Resend(process.env.RESEND_SEND_KEY);

interface SendReservationCreatedEmailProps extends ReservationCreatedEmailProps {
    recipientEmail: string;
}

const sendReservationCreatedEmail = async ({
    bookerFirstName,
    bookerLastName,
    endDate,
    hallNames,
    isParty,
    organisationName,
    recipientEmail,
    remarks,
    reservationNumber,
    startDate,
}: SendReservationCreatedEmailProps) => {
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
export type { SendReservationCreatedEmailProps };
