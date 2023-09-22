import {redirect} from "next/navigation";
import {buttonVariants} from "@/components/ui/button";
import {Switch} from "@/components/ui/Switch";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import {RedirectType} from "next/dist/client/components/redirect";

export default async function AddReservationForm() {
    "use server"
    const supabase = createServerComponentClient({cookies})
    const queryMaterials = supabase.from("products").select().eq("categorie_id", "839926c4-97a7-48c4-a115-45548580c148")
    const materials: DbResult<typeof queryMaterials> = await queryMaterials

    if (!materials.data) return undefined
    const onCreateReservation = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")


        if (name === null) redirect("/name")

        //const supabase = createServerComponentClient({cookies})
        //await supabase.from("reservations").insert({name: name})

        redirect("/reserveren/b5c484f6-66b5-4086-a022-fccda3b815c8/1/overview", RedirectType.push)
    }

    return <form action={onCreateReservation} className={"grid md:grid-cols-2 gap-2"}>
        <div className={"col-span-2 mb-8"}>
            <h2 className={" text-2xl font-bold text-center"}>Duid hieronder extra's aan</h2>
            <div className={"flex flex-row my-4"}>
                <Switch className={"mr-2"}/>
                <label htmlFor={"drinks"}
                       className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 my-auto"}>Drank
                    aanwezig</label>
            </div>
            {
                materials.data.map((material) =>
                    <div className={"flex flex-row my-4"}>
                        <Switch className={"mr-2"}/>
                        <label htmlFor={"material"}
                               className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 my-auto"}>{material.name}</label>
                    </div>
                )
            }
        </div>
        <h2 className={"col-span-2 text-2xl font-bold text-center"}>Vul uw gegevens in</h2>
        <div>
            <label htmlFor={"name"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} placeholder={"Familienaam"}
                   className={"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"firstNname"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Voornaam</label>
            <input required id={"name"} name={"name"} placeholder={"Voornaam"}
                   className={"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"email"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Email</label>
            <input type={"email"} required id={"email"} name={"email"} placeholder={"naam@voorbeeld.be"}
                   className={"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"telnumber"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Gsm-nummer<span
                className={"font-light text-xs"}> (Om de poort te openen)</span></label>
            <input type={"tel"} required id={"telnumber"} name={"telnumber"} placeholder={"0123 45 67 89"}
                   className={"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"street"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Straat
                en huisnummer</label>
            <input required id={"street"} name={"street"} placeholder={"Straatnaam en nummer"}
                   className={"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"city"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Woonplaats</label>
            <input required id={"name"} name={"name"} placeholder={"Gemeente of stad"}
                   className={"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div className={"col-span-2"}>
            <label htmlFor={"Omschrijving"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Omschrijving</label>
            <textarea required id={"Omschrijving"} name={"Omschrijving"} placeholder={"Soort event"}
                      className={"h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"organisation"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Organisatie</label>
            <input id={"organisation"} name={"organisation"} placeholder={"Beweging.net"}
                   className={"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"taxnumber"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>BTW-nummer</label>
            <input id={"taxnumber"} name={"taxnumber"} placeholder={"BE 1234 456 789"}
                   className={"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <button type={"submit"} className={buttonVariants({variant: "green"})}>Reserveer</button>
    </form>
}