import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import CategoriesTable from "@/components/business/categories/categories-table";
import {PlusCircle} from "lucide-react";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("categories").select()
    const categories: DbResult<typeof query> = await query

    if (!categories.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div className={"flex flex-col md:flex-row gap-2 p-4"}>
            <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Categorieën</h1>
            <Link href={"/dashboard/producten/categorieen/add"} className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><PlusCircle size={16}/>Toevoegen</Link>
        </div>
        <CategoriesTable categories={categories.data}/>
    </main>
}