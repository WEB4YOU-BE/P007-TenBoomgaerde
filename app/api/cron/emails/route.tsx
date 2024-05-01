import {Resend} from "resend";
import {NextResponse} from "next/server";

const resend = new Resend(process.env.RESEND_SEND_KEY)

export async function GET() {
    /*    await resend.emails.send({
            from: 'VZW Ten Boomgaerde Lichtervelde <info@vzwtenboomgaerdelichtervelde.be>',
            to: 'tiebe.dw1@gmail.com',
            subject: 'Bevestiging reservatie bij Ten Boomgaerde',
            react: TestMail({reservationNumber: "blabla-bla", fullName: "Jens Penneman", startDate: new Date(), startTime: "17:00", endDate: new Date(), endTime: "22:00", roomName: "Grote zaal", phoneNumber: "0471710991", organisationName: "Okra", vatNumber: "BE1234567890", delAddress: "Leysafortstraat 20", delCity: "Stekene", delPostalCode: 8810, remarks: "Stoelen & tafels graag"}),
        });*/

    return NextResponse.json({})
}