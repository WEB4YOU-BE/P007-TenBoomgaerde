import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import LoginRouteProtection from "@/components/authentication/login-route-protection";
import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";
import ReservationForm from "@/components/reservations/ReservationForm";
import {formatISO} from "date-fns";
import {Resend} from "resend";
import Mail from "@/emails/reservatie-bevestiging"

const resend = new Resend(process.env.RESEND_SEND_KEY)

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const queryRooms = supabase.from("rooms").select()
    const rooms: DbResult<typeof queryRooms> = await queryRooms

    const queryAllReservations = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname), rooms(id), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd, organizations(name), remarks`).gte('start_date', formatISO(new Date(), {representation: 'date'})).order('start_date')
    const allReservations: DbResult<typeof queryAllReservations> = await queryAllReservations

    const queryTimeframes = supabase.from("bloks").select()
    const timeframes: DbResult<typeof queryTimeframes> = await queryTimeframes

    const {data: {user}} = await supabase.auth.getUser()
    const query = supabase.from("users").select('*').eq('id', user?.id)
    const gebruiker: DbResult<typeof query> = await query

    const queryLatestRes = supabase.from("reservations").select(`reservation_number`).order('reservation_number', {ascending: false}).limit(1)
    const latestReservation: DbResult<typeof queryLatestRes> = await queryLatestRes

    const queryOrganizations = supabase.from("organizations").select()
    const organizations: DbResult<typeof queryOrganizations> = await queryOrganizations

    const latestReservationNumber: number = (latestReservation.data && latestReservation.data[0]) ? latestReservation.data[0].reservation_number : 0

    const handleSubmitReservation = async (formData: FormData) => {
        "use server"
        const supabase = createServerComponentClient({cookies})

        const reservationNumber = latestReservationNumber + 1
        const userId = formData.get("userId") !== null ? String(formData.get("userId")) : null
        const roomId = formData.get("room") !== null ? String(formData.get("room")) : null
        const startDate = formData.get("start") !== null ? String(formData.get("start")) : null
        const startHour = formData.get("startTimeframe") !== null ? String(formData.get("startTimeframe")) : null
        const endDate = formData.get("end") !== null ? String(formData.get("end")) : null
        const endHour = formData.get("endTimeframe") !== null ? String(formData.get("endTimeframe")) : null
        const organization = formData.get("organization") !== null ? String(formData.get("organization")) : null
        const remark = formData.get("remark") !== null ? String(formData.get("remark")) : null

        const status = "in afwachting"

        supabase.from("reservations").insert({
            reservation_year: startDate,
            reservation_number: reservationNumber,
            user_id: userId,
            room_id: roomId,
            start_date: startDate,
            end_date: endDate,
            start_hour: startHour,
            end_hour: endHour,
            status: status,
            organizations_id: organization,
            remarks: remark,
        })


        await resend.emails.send({
            from: 'VZW Ten Boomgaerde Lichtervelde <info@vzwtenboomgaerdelichtervelde.be>',
            to: user?.email || "jenspenneman26@gmail.com",
            subject: 'Bevestiging reservatie bij Ten Boomgaerde',
            react: Mail({
                reservationNumber: reservationNumber.toString(),
                fullName: gebruiker.data?.[0].firstname,
                startDate: new Date(),
                startTime: "17:00",
                endDate: new Date(),
                endTime: "22:00",
                roomName: "Grote zaal",
                phoneNumber: "0471710991",
                organisationName: "Okra",
                vatNumber: "BE1234567890",
                delAddress: "Leysafortstraat 20",
                delCity: "Stekene",
                delPostalCode: 8810,
                remarks: "Stoelen & tafels graag"
            }),
        });

        redirect("/klant", RedirectType.push)
    }

    return <LoginRouteProtection>
        <main className={"container mx-auto max-w-screen-xl p-2"}>
            <ReservationForm submit={handleSubmitReservation} rooms={rooms} timeframes={timeframes} gebruiker={gebruiker} user={user} allReservations={allReservations}
                             organizations={organizations}/>
        </main>
    </LoginRouteProtection>
}