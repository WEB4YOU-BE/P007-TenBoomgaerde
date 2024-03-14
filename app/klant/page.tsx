import Reservation from "@/components/ui/klant/Reservation";
import {cookies} from "next/headers";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {DbResult, Tables} from "@/lib/database.types";

export default async function Index() {
    const supabase = createServerComponentClient({cookies})

    const {data: {user}} = await supabase.auth.getUser()

    const queryReservation = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname, phone), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd, organizations(name), remarks`).eq('user_id', user?.id).order('start_date', {ascending: false})
    const reservations: DbResult<typeof queryReservation> = await queryReservation

    if (!reservations.data) return undefined

    const usersReservations: Tables<"reservations">[] = reservations.data

    return <main className={"w-full min-h-[100svh]"}>
        <div className={"p-4 block sm:flex items-center justify-between"}>
            <div className={"w-full mb-1"}>
                <div className={"mb-4"}>
                    <h1 className={"text-2xl font-semibold text-gray-900 sm:text-3xl"}>Mijn boekingen</h1>
                </div>
                <section>
                    <h2 className={"text-xl font-semibold text-gray-900 sm:text-2xl border-b pb-2 pt-4 sticky top-0 bg-white"}>Komende
                        boekingen</h2>
                    {usersReservations.filter(reservation => ((new Date(reservation.start_date)) >= new Date())).map(
                        (reservation, index) => <Reservation key={index} {...reservation} />
                    )}
                </section>
                <section>
                    <h2 className={"text-xl font-semibold text-gray-900 sm:text-2xl border-b pb-2 pt-4 sticky top-0 bg-white"}>Verleden
                        boekingen</h2>
                    {usersReservations.filter(reservation => ((new Date(reservation.start_date)) <= new Date())).map(
                        (reservation, index) => <Reservation key={index} {...reservation} />
                    )}
                </section>
            </div>
        </div>
    </main>;
}
