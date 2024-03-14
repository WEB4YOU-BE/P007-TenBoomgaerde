import InfoReservationForm from "@/components/business/reservations/info-reservation-form";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult, Tables} from "@/lib/database.types";

export default async function page({params}: {
    params: {
        reservatieId: string
    }
}) {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname, phone, email, street, postcode, city), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd, organizations(name, btw_number), remarks`).eq('id', params.reservatieId)
    const reservation: DbResult<typeof query> = await query

    if (!reservation.data) return undefined

    const reservations: Tables<"reservations">[] = reservation.data

    return <main className={"mx-auto p-4 lg:px-8 flex flex-col gap-4"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate text-center"}>Reservatie
            bekijken</h1>
        <InfoReservationForm id={reservation.data[0].id}
                             reservationYear={reservations[0].reservation_year}
                             reservationNumber={reservations[0].reservation_number}
                             users={reservations[0].users} rooms={reservations[0].rooms}
                             start_date={reservations[0].start_date} end_date={reservations[0].end_date}
                             start_hour={reservations[0].start_hour} end_hour={reservations[0].end_hour}
                             accessCode={reservations[0].access_code}
                             status={reservations[0].status} products={reservations[0].products}
                             gefactureerd={reservations[0].gefactureerd} organizations={reservations[0].organizations}
                             remarks={reservations[0].remarks}/>
    </main>
}