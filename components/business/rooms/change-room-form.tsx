import {redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {RedirectType} from "next/dist/client/components/redirect";
import {buttonVariants} from "@/components/ui/button";
import {DbResult} from "@/lib/database.types";

interface CategoryIndexProps {
    id: string;
}

export default async function ChangeRoomForm({id}: CategoryIndexProps) {
    const onChangeCategory = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")
        const forSale = formData.get("forSale") === "on"
        const price = formData.get("price")

        if (name === null) redirect("/name")

        const supabase = createServerComponentClient({cookies})
        await supabase.from("rooms").update({name: name, private: forSale, day_price: price}).eq('id', id)

        redirect("/dashboard/zalen", RedirectType.push)
    }

    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("rooms").select().eq('id', id)
    const room: DbResult<typeof query> = await query

    if (!room.data) return undefined

    return <form action={onChangeCategory} className={"flex flex-col gap-2"}>
        <div>
            <label htmlFor={"name"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} defaultValue={room.data[0].name}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"price"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Prijs
                per dag</label>
            <input type={"number"} step={0.01} min={0} required id={"price"} name={"price"}
                   defaultValue={room.data[0].day_price}
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
            <input type={"checkbox"} id={"forSale"} name={"forSale"} defaultChecked={room.data[0].private}
                   className={"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"}/>
            <label htmlFor={"forSale"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Is
                te koop?</label>
        </div>
        <button type={"submit"} className={buttonVariants({variant: "green"})}>Wijzig</button>
    </form>
}