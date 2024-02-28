import {Resend} from "resend";

import TestMail from "@/emails/reservatie-bevestiging"

const resend = new Resend(process.env.RESEND_SEND_KEY)

export async function GET() {


    await resend.emails.send({
        from: 'VZW Ten Boomgaerde Lichtervelde <info@vzwtenboomgaerdelichtervelde.be>',
        to: 'jenspenneman26@gmail.com',
        subject: 'Bevestiging reservatie bij Ten Boomgaerde',
        react: TestMail({voornaam: "Jens"}),
    });
}