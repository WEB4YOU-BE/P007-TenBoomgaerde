import {redirect} from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {RedirectType} from "next/dist/client/components/redirect";
import {buttonVariants} from "@/components/atoms/button";
import Link from "next/link";
import { cn } from "@/utils/tailwindcss/MergeCN";

export default async function AddCategoryForm() {
    const onCreateCategory = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")

        if (name === null) redirect("/name")

        const supabase = createClient()
        await supabase.from("categories").insert({name: name})

        redirect("/dashboard/producten/categorieen", RedirectType.push)
    }

    return <form action={onCreateCategory} className={"flex flex-col gap-2"}>
        <div>
            <label htmlFor={"name"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} placeholder={"Verhuur"}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div className={"grid lg:grid-cols-2 gap-4 mt-4"}>
            <Link href={"/dashboard/producten/categorieen"}
                  className={buttonVariants({variant: "secondary"})}>Terug</Link>
            <button type={"submit"} className={cn(buttonVariants({variant: "green"}), "max-sm:row-start-1")}>Maak aan
            </button>
        </div>

    </form>
}