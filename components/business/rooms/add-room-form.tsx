import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {buttonVariants} from "@/components/atoms/button";
import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";
import {Switch} from "@/components/atoms/Switch";
import Link from "next/link";
import { cn } from "@/utils/tailwindcss/MergeCN";

export default async function AddRoomForm() {
    const onCreateRoom = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")
        const forSale = formData.get("forSale") === "on"
        const price = formData.get("price")

        if (name === null) redirect("/name")
        if (forSale === null) redirect("/forSale")
        if (price === null) redirect("/price")

        const supabase = createClient()
        await supabase.from("rooms").insert({name: name, private: forSale, day_price: price})

        redirect("/dashboard/zalen", RedirectType.push)
    }

    return <form action={onCreateRoom} className={"flex flex-col gap-2"}>
        <div>
            <label htmlFor={"name"} className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} placeholder={"Kleine zaal"}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"price"} className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Prijs per dag</label>
            <input type={"number"} step={0.01} min={0} required id={"price"} name={"price"} placeholder={"5.00"}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        {/*
        <div>
            <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Categorie</label>
            <input
                className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        */}
        <div className={"flex items-center text-current gap-2"}>
            <label htmlFor={"forSale"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Privaat?</label>
            <Switch id={"forSale"} name={"forSale"}/>
        </div>
        <div className={"grid lg:grid-cols-2 gap-4 mt-4"}>
            <Link href={"/dashboard/zalen"} className={buttonVariants({variant: "secondary"})}>Terug</Link>
            <button type={"submit"} className={cn(buttonVariants({variant: "green"}), "max-sm:row-start-1")}>Maak aan
            </button>
        </div>
    </form>
}