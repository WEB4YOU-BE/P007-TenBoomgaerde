import { NextResponse } from "next/server";
import { Resend } from "resend";

import ReservationCreatedEmail from "@/emails/ReservationCreatedEmail";

const resend = new Resend(process.env.RESEND_SEND_KEY);

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as {
            bookerFirstName: string;
            bookerLastName: string;
            endDate: string;
            hallNames: string[];
            isParty: boolean;
            organisationName: string | null;
            recipientEmail: string;
            remarks: string | null;
            reservationNumber: string;
            startDate: string;
        };

        const {
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
        } = body;

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
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
