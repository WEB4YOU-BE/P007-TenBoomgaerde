import {redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {RedirectType} from "next/dist/client/components/redirect";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";

export default async function AddBlokForm() {
    const onCreateBlok = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")
        const startHour = formData.get("startHour")
        const endHour = formData.get("endHour")

        if (name === null) redirect("/name")
        if (startHour === null) redirect("/startHour")
        if (endHour === null) redirect("/endHour")

        const supabase = createServerComponentClient({cookies})
        await supabase.from("bloks").insert({name: name, start_hour: startHour, end_hour: endHour})

        redirect("/dashboard/zalen/blokken", RedirectType.push)
    }

    return <form action={onCreateBlok} className={"flex flex-col gap-2"}>
        <div>
            <label htmlFor={"name"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} placeholder={"Voormiddag"}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div className={"lg:grid lg:grid-cols-2 gap-4"}>
            <div>
                <label htmlFor={"startHour"}
                       className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Start
                    uur</label>
                <input autoFocus required type={"time"} id={"startHour"} name={"startHour"}
                       className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
            </div>
            <div>
                <label htmlFor={"endHour"}
                       className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Eind
                    uur</label>
                <input autoFocus required type={"time"} id={"endHour"} name={"endHour"}
                       className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
            </div>
        </div>
        <div className={"grid lg:grid-cols-2 gap-4 mt-4"}>
            <Link href={"/dashboard/zalen/blokken"} className={buttonVariants({variant: "secondary"})}>Terug</Link>
            <button type={"submit"} className={cn(buttonVariants({variant: "green"}), "max-sm:row-start-1")}>Maak aan
            </button>
        </div>
    </form>
}