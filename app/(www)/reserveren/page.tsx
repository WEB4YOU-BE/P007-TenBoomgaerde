import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import LoginRouteProtection from "@/components/authentication/login-route-protection";
import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";
import ReservationForm from "@/components/reservations/ReservationForm";
import {formatISO} from "date-fns";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const queryRooms = supabase.from("rooms").select()
    const rooms: DbResult<typeof queryRooms> = await queryRooms

    const queryAllReservations = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname), rooms(id), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd, organizations(name)`).gte('start_date', formatISO(new Date(), {representation: 'date'})).order('start_date')
    const allReservations: DbResult<typeof queryAllReservations> = await queryAllReservations

    const queryTimeframes = supabase.from("bloks").select()
    const timeframes: DbResult<typeof queryTimeframes> = await queryTimeframes

    const queryMaterials = supabase.from("products").select().eq("categorie_id", "839926c4-97a7-48c4-a115-45548580c148")
    const materials: DbResult<typeof queryMaterials> = await queryMaterials

    const {data: {user}} = await supabase.auth.getUser()
    const query = supabase.from("users").select('*').eq('id', user?.id)
    const gebruiker: DbResult<typeof query> = await query

    const queryLatestRes = supabase.from("reservations").select(`reservation_number`).order('reservation_number', {ascending: false}).limit(1)
    const reservationNumber: DbResult<typeof queryLatestRes> = await queryLatestRes

    const latestReservationNumber: number = reservationNumber.data === null ? 0 : reservationNumber.data[0].reservation_number

    const handleSubmitReservation = async (formData: FormData) => {
        "use server"
        const supabase = createServerComponentClient({cookies})

        const reservationNumber = latestReservationNumber + 1
        const userId = formData.get("userId")
        const roomId = formData.get("room")
        const startDate = formData.get("start")
        const startHour = formData.get("startTimeframe")
        const endDate = formData.get("end")
        const endHour = formData.get("endTimeframe")

        const status = "in afwachting"

        await supabase.from("reservations").insert({
            reservation_year: startDate,
            reservation_number: reservationNumber,
            user_id: userId,
            room_id: roomId,
            start_date: startDate,
            end_date: endDate,
            start_hour: startHour,
            end_hour: endHour,
            status: status
        })
        redirect("/klant", RedirectType.push)
    }

    return <LoginRouteProtection>
        <main className={"container mx-auto max-w-screen-xl p-2"}>
            <ReservationForm submit={handleSubmitReservation} rooms={rooms} timeframes={timeframes} materials={materials} gebruiker={gebruiker} user={user} allReservations={allReservations}/>
        </main>
    </LoginRouteProtection>
}