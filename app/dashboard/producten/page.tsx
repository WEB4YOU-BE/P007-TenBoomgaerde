import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import ProductsTable from "@/components/business/products/products-table";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    //const query = supabase.from("products").select(`id, name, price, for_sale, categories (name)`)
    const query = supabase.from("products").select()
    const products: DbResult<typeof query> = await query

    if (!products.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div className={"flex flex-col md:flex-row gap-2 py-4 pl-4"}>
            <h1 className={"text-xl font-semibold text-gray-900 sm:text-2xl scroll-m-20 tracking-tight md:flex-grow"}>Producten</h1>
            <Link href={"/dashboard/products/add"} className={cn(buttonVariants({variant: "green"}), "mx-2")}>
                <svg className={"w-5 h-5 mr-2 -ml-1"} fill={"currentColor"} viewBox={"0 0 20 20"}
                     xmlns={"http://www.w3.org/2000/svg"}>
                    <path
                        d={"M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"}
                    ></path>
                </svg>
                Toevoegen
            </Link>
        </div>
        <ProductsTable products={products.data}/>
    </main>
}