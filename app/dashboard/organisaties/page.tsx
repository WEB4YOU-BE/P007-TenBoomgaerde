import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {PlusCircle} from "lucide-react";

export default async function page() {
    /*const supabase = createServerComponentClient({cookies})
    const query = supabase.from("products").select(`id, name, price, for_sale, categories(name)`)
    const products: DbResult<typeof query> = await query

    if (!products.data) return undefined*/

    return <main className={"flex flex-col gap-2"}>
        <div className={"flex flex-col md:flex-row gap-2 p-4"}>
            <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Organisaties</h1>
            <Link href={"/dashboard/organisaties/add"}
                  className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><PlusCircle size={16}/>Toevoegen</Link>
        </div>
        {/*<ProductsTable products={products.data}/>*/}
    </main>
}