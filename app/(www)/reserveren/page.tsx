import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import LoginRouteProtection from "@/components/authentication/login-route-protection";
import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const queryRooms = supabase.from("rooms").select()
    const rooms: DbResult<typeof queryRooms> = await queryRooms

    const queryTimeframes = supabase.from("bloks").select()
    const timeframes: DbResult<typeof queryTimeframes> = await queryTimeframes

    const queryMaterials = supabase.from("products").select().eq("categorie_id", "839926c4-97a7-48c4-a115-45548580c148")
    const materials: DbResult<typeof queryMaterials> = await queryMaterials

    const {data: {user}} = await supabase.auth.getUser()
    const query = supabase.from("users").select('*').eq('id', user?.id)
    const gebruiker: DbResult<typeof query> = await query

    const handleSubmitReservation = async (formData: FormData) => {
        "use server"
        const supabase = createServerComponentClient({cookies})

        const reservationNumber = 4
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
            <form id="reservationForm" action={handleSubmitReservation}/>
            <h1 className={"text-3xl font-bold"}>Reservatie</h1>
            <div className={"rounded-lg bg-gray-100 shadow-sm p-2 flex flex-col gap-4"}>
                <section>
                    <fieldset className={"flex flex-row flex-wrap gap-2"}>
                        <legend className={"text-xl font-semibold"}>Selecteer de zaal</legend>
                        {
                            rooms.data?.map((room) => <div key={room.id} className={"flex-grow"}>
                                <input required form="reservationForm" type="radio" name="room" id={room.id} value={room.id} className={"peer hidden"}/>
                                <label htmlFor={room.id}
                                       className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400 w-full")}>{room.name}</label>
                            </div>)
                        }
                    </fieldset>
                </section>
                <hr/>
                <section className={"flex flex-col flex-wrap gap-2"}>
                    <fieldset>
                        <legend className={"text-xl font-semibold"}>Selecteer de startmoment</legend>
                        {/*<DatePickerSCProxy/>*/}
                        <input required form="reservationForm" type="date" name="start" min={"2023-11-10"}
                               className={cn(buttonVariants({variant: "outline"}), "w-full")}/>
                    </fieldset>
                    <fieldset className={"flex flex-row flex-wrap gap-2"}>
                        {
                            timeframes.data?.map((timeframe) => <div key={timeframe.id} className={"flex-grow"}>
                                <input required form="reservationForm" type="radio" name="startTimeframe" id={"start-" + timeframe.id} value={timeframe.id} className={"peer hidden"}/>
                                <label htmlFor={"start-" + timeframe.id}
                                       className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400 w-full")}>{timeframe.name} ({timeframe.start_hour.substring(0, 5)})</label>
                            </div>)
                        }
                    </fieldset>
                </section>
                <hr/>
                <section className={"flex flex-col flex-wrap gap-2"}>
                    <fieldset>
                        <legend className={"text-xl font-semibold"}>Selecteer de eindmoment</legend>
                        {/*<DatePickerSCProxy/>*/}
                        <input required form="reservationForm" type="date" name="end" min={"2023-11-10"}
                               className={cn(buttonVariants({variant: "outline"}), "w-full")}/>
                    </fieldset>
                    <fieldset className={"flex flex-row flex-wrap gap-2"}>
                        {
                            timeframes.data?.map((timeframe) => <div key={timeframe.id} className={"flex-grow"}>
                                <input required form="reservationForm" type="radio" name="endTimeframe" id={"end-" + timeframe.id} value={timeframe.id} className={"peer hidden"}/>
                                <label htmlFor={"end-" + timeframe.id}
                                       className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400 w-full")}>{timeframe.name} ({timeframe.end_hour.substring(0, 5)})</label>
                            </div>)
                        }
                    </fieldset>
                </section>
                <hr/>
                <section className={"flex flex-col flex-wrap gap-2"}>
                    <fieldset className={"flex flex-row flex-wrap gap-2"}>
                        <legend className={"text-xl font-semibold"}>Duid uw extra&apos;s aan</legend>
                        <div className={"flex-grow"}>
                            <input form="reservationForm" type="checkbox" name="material" id={"material-drank"} value={"drank"}
                                   className={"peer hidden"}/>
                            <label htmlFor={"material-drank"}
                                   className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400 w-full")}>Drank</label>
                        </div>
                        {
                            materials.data?.map((material) => <div key={material.id} className={"flex-grow"}>
                                <input form="reservationForm" type="checkbox" name="material" id={"material-" + material.id} value={material.id} className={"peer hidden"}/>
                                <label htmlFor={"material-" + material.id}
                                       className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400 w-full")}>{material.name}</label>
                            </div>)
                        }
                    </fieldset>
                </section>
                <hr/>
                <section>
                    <p>Je bent aangemeld als {gebruiker.data && gebruiker.data[0].firstname}</p>
                    <input form="reservationForm" type="text" name="userId" defaultValue={user?.id} readOnly className={"hidden"}/>
                </section>
                <section>
                    <button form={"reservationForm"} className={buttonVariants()}>Reserveer</button>
                </section>
            </div>
        </main>
    </LoginRouteProtection>
}