import {redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Switch} from "@/components/ui/Switch";
import {buttonVariants} from "@/components/ui/button";
import {DbResult} from "@/lib/database.types";
import {RedirectType} from "next/dist/client/components/redirect";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface ProductIndexProps {
    id: string;
}

export default async function ChangeProductForm({id}: ProductIndexProps) {
    const supabase = createServerComponentClient({cookies})
    const queryCategories = supabase.from("categories").select()
    const categories: DbResult<typeof queryCategories> = await queryCategories
    const queryProduct = supabase.from("products").select().eq('id', id)
    const product: DbResult<typeof queryProduct> = await queryProduct

    if (!categories.data) return undefined
    if (!product.data) return undefined
    const onChangeProduct = async (formData: FormData) => {
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
        await supabase.from("products").update({
            name: name,
            price: price,
            for_sale: forSale,
            categorie_id: categoryId
        }).eq('id', id)

        redirect("/dashboard/producten", RedirectType.push)
    }

    return <form action={onChangeProduct} className={"flex flex-col gap-2"}>
        <div>
            <label htmlFor={"name"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} defaultValue={product.data[0].name}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"price"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Prijs
                per dag</label>
            <input type={"number"} step={0.01} min={0} required id={"price"} name={"price"}
                   defaultValue={product.data[0].price}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div className={"flex items-center text-current gap-2"}>
            <label htmlFor={"forSale"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Is
                te koop?</label>
            <Switch id={"forSale"} name={"forSale"} defaultChecked={product.data[0].private}/>
        </div>
        <div>
            <label htmlFor={"category"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Categorie
                <select name="categoryId" id="categoryId" defaultValue={product.data[0].categorie_id}>
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
            <button type={"submit"} className={cn(buttonVariants({variant: "green"}), "max-sm:row-start-1")}>Wijzig
            </button>
        </div>
    </form>
}