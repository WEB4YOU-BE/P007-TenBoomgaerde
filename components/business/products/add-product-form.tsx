import {redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Switch} from "@/components/ui/Switch";
import {buttonVariants} from "@/components/ui/button";
import {DbResult} from "@/lib/database.types";
import {RedirectType} from "next/dist/client/components/redirect";
import Link from "next/link";
import {cn} from "@/lib/utils";

export default async function AddProductForm() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("categories").select()
    const categories: DbResult<typeof query> = await query

    if (!categories.data) return undefined
    const onCreateProduct = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")
        const price = formData.get("price")
        const forSale = formData.get("forSale") === "on"
        const categoryId = formData.get("categoryId")

        if (name === null) redirect("/name")
        if (price === null) redirect("/price")
        if (forSale === null) redirect("/forSale")
        if (categoryId === null) redirect("/categoryId")

        const supabase = createServerComponentClient({cookies})
        await supabase.from("products").insert({name: name, price: price, for_sale: forSale, categorie_id: categoryId})

        redirect("/dashboard/producten", RedirectType.push)
    }

    return <form action={onCreateProduct} className={"flex flex-col gap-2"}>
        <div>
            <label htmlFor={"name"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} placeholder={"Cola"}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"price"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Prijs
                per dag</label>
            <input type={"number"} step={0.01} min={0} required id={"price"} name={"price"} placeholder={"2.50"}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div className={"flex items-center text-current gap-2"}>
            <label htmlFor={"forSale"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Is
                te koop?</label>
            <Switch id={"forSale"} name={"forSale"}/>
        </div>
        <div>
            <label htmlFor={"category"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Categorie
                <select name="categoryId" id="categoryId">
                    {
                        categories.data.map((category) =>
                            <option key={category.id} value={category.id} id={"categoryId"}>{category.name}</option>
                        )
                    }
                </select>
            </label>
        </div>
        <div className={"grid lg:grid-cols-2 gap-4 mt-4"}>
            <Link href={"/dashboard/producten"} className={buttonVariants({variant: "secondary"})}>Terug</Link>
            <button type={"submit"} className={cn(buttonVariants({variant: "green"}), "max-sm:row-start-1")}>Maak aan
            </button>
        </div>
    </form>
}