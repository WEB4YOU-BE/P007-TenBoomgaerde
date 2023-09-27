import {redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {RedirectType} from "next/dist/client/components/redirect";
import {buttonVariants} from "@/components/ui/button";
import {DbResult} from "@/lib/database.types";

interface CategoryIndexProps {
    id: string;
}

export default async function ChangeCategoryForm({id}: CategoryIndexProps) {
    const onChangeCategory = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")

        if (name === null) redirect("/name")

        const supabase = createServerComponentClient({cookies})
        await supabase.from("categories").update({name: name}).eq('id', id)

        redirect("/dashboard/producten/categorieen", RedirectType.push)
    }

    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("categories").select().eq('id', id)
    const categorie: DbResult<typeof query> = await query

    if (!categorie.data) return undefined

    return <form action={onChangeCategory} className={"flex flex-col gap-2"}>
        <div>
            <label htmlFor={"name"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} defaultValue={categorie.data[0].name}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <button type={"submit"} className={buttonVariants({variant: "green"})}>Wijzig</button>
    </form>
}