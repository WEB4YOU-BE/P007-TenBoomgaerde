import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("rooms").select()
    const rooms: DbResult<typeof query> = await query

    const handleSubmitReservation = async (formData: FormData) => {
        "use server"
        console.log(formData)
    }

    return <main className={"container mx-auto max-w-screen-xl p-2"}>
        <form id="reservationForm" action={handleSubmitReservation} method="POST"/>
        <h1 className={"text-3xl font-bold"}>Reservatie</h1>
        <div className={"rounded-lg bg-gray-100 shadow-sm p-2 flex flex-col gap-4"}>
            <section>
                <fieldset className={"flex flex-row flex-wrap gap-2"}>
                    <legend className={"text-xl font-semibold"}>Selecteer de zaal</legend>
                    {
                        rooms.data?.map((room, index) => <div key={room.id}>
                            <input required form="reservationForm" type="radio" name="zaal" id={room.id} value={room.id} className={"peer hidden"}/>
                            <label htmlFor={room.id}
                                   className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400")}>{room.name}</label>
                        </div>)
                    }
                </fieldset>
            </section>
            <hr/>
            <section>
                <button form={"reservationForm"} className={buttonVariants()}>bevestig</button>
            </section>
        </div>
    </main>
}