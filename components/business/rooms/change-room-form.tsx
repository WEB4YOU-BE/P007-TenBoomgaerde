import {redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {RedirectType} from "next/dist/client/components/redirect";
import {buttonVariants} from "@/components/ui/button";
import {DbResult} from "@/lib/database.types";
import {Switch} from "@/components/ui/Switch";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface RoomIndexProps {
    id: string;
}

export default async function ChangeRoomForm({id}: RoomIndexProps) {
    const onChangeRoom = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")
        const forSale = formData.get("forSale") === "on"
        const price = formData.get("price")
        const price2 = formData.get("price2")

        if (name === null) redirect("/name")
        if (forSale === null) redirect("/forSale")
        if (price === null) redirect("/price")
        if (price2 === null) redirect("/price2")

        const supabase = createServerComponentClient({cookies})
        await supabase.from("rooms").update({
            name: name,
            private: forSale,
            day_price: price,
            day_price2: price2
        }).eq('id', id)

        redirect("/dashboard/zalen", RedirectType.push)
    }

    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("rooms").select().eq('id', id)
    const room: DbResult<typeof query> = await query

    if (!room.data) return undefined

    return <form action={onChangeRoom} className={"flex flex-col gap-2"}>
        <div>
            <label htmlFor={"name"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} defaultValue={room.data[0].name}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"price"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Prijs
                per blok</label>
            <input type={"number"} step={0.01} min={0} required id={"price"} name={"price"}
                   defaultValue={room.data[0].day_price}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"price2"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Prijs
                vanaf 2 blokken</label>
            <input type={"number"} step={0.01} min={0} required id={"price2"} name={"price2"}
                   defaultValue={room.data[0].day_price2}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div className={"flex items-center text-current gap-2"}>
            <label htmlFor={"forSale"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Privaat?</label>
            <Switch id={"forSale"} name={"forSale"} defaultChecked={room.data[0].private}/>
        </div>
        <div className={"grid lg:grid-cols-2 gap-4 mt-4"}>
            <Link href={"/dashboard/zalen"} className={buttonVariants({variant: "secondary"})}>Terug</Link>
            <button type={"submit"} className={cn(buttonVariants({variant: "green"}), "max-sm:row-start-1")}>Wijzig
            </button>
        </div>
    </form>
}