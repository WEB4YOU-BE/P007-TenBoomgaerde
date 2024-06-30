import {redirect} from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {buttonVariants} from "@/components/atoms/button";
import {DbResult} from "@/lib/database.types";
import { cn } from "@/utils/tailwindcss/MergeCN";

export default async function UserForm() {
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    const query = supabase.from("users").select('*').eq('id', user?.id)
    const gebruiker: DbResult<typeof query> = await query

    const onChangeUser = async (formData: FormData) => {
        "use server"
        const firstname = formData.get("firstname")
        const lastname = formData.get("lastname")
        const email = formData.get("email")
        const phone = formData.get("phone")
        const street = formData.get("street")
        const postcode = formData.get("postcode")
        const city = formData.get("city")

        if (firstname === null) redirect("/name")
        if (lastname === null) redirect("/lastname")
        if (email === null) redirect("/email")
        if (phone === null) redirect("/phone")
        if (street === null) redirect("/street")
        if (postcode === null) redirect("/postcode")
        if (city === null) redirect("/city")

        const supabase = createClient()
        await supabase.from("users").update({firstname: firstname, lastname: lastname, email: email, phone: phone, street: street, postcode: postcode, city: city}).eq('id', user?.id)

    }

    return <form action={onChangeUser} className={"grid lg:grid-cols-2 gap-4 lg:w-2/3 w-full mx-auto"}>
        <div>
            <label htmlFor={"firstname"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Voornaam</label>
            <input autoFocus required id={"firstname"} name={"firstname"} placeholder={"Voornaam"}
                   defaultValue={gebruiker.data === null ? "" : gebruiker.data[0].firstname ?? ""}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"lastname"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Familienaam</label>
            <input required id={"lastname"} name={"lastname"} placeholder={"Familienaam"}
                   defaultValue={gebruiker.data === null ? "" : gebruiker.data[0].lastname ?? ""}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"email"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Email</label>
            <input required id={"email"} name={"email"} type={"email"} placeholder={"naam@voorbeeld.be"}
                   defaultValue={gebruiker.data === null ? "" : gebruiker.data[0].email ?? ""}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"phone"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Gsm-nummer</label>
            <input required id={"phone"} name={"phone"} placeholder={"0123 45 67 89"}
                   defaultValue={gebruiker.data === null ? "" : gebruiker.data[0].phone ?? ""}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"street"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Straat</label>
            <input required id={"street"} name={"street"} placeholder={"Straatnaam en nummer"}
                   defaultValue={gebruiker.data === null ? "" : gebruiker.data[0].street ?? ""}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"postcode"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Postcode</label>
            <input type={"number"} min={1000} max={9999} step={1} required id={"postcode"} name={"postcode"}
                   placeholder={"0000"} defaultValue={gebruiker.data === null ? "" : gebruiker.data[0].postcode ?? ""}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"city"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Gemeente</label>
            <input required id={"city"} name={"city"} placeholder={"Gemeente"}
                   defaultValue={gebruiker.data === null ? "" : gebruiker.data[0].city ?? ""}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>

        <button type={"submit"} className={cn(buttonVariants({variant: "green"}), "col-start-1")}>Werk bij</button>
    </form>
}