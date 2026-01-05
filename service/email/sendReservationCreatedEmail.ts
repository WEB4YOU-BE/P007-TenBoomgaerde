import { ReservationCreatedEmailProps } from "@/emails/ReservationCreatedEmail";

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
    const response = await fetch("/api/email/reservation-created", {
        body: JSON.stringify({
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
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });

    if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(
            `Failed to send email: ${errorData.error ?? "Unknown error"}`
        );
    }

    return (await response.json()) as { data: unknown };
};

export default sendReservationCreatedEmail;
export type { SendReservationCreatedEmailProps };
