import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import { cn } from "@/utils/tailwindcss/MergeCN";
import {buttonVariants} from "@/components/atoms/button";
import Link from "next/link";
import ProductsTable from "@/components/business/products/products-table";
import {PlusCircle} from "lucide-react";

export const metadata = {
    title: "Producten",
    description: 'Bekijk alle producten die beschikbaar zijn in VZW Ten Boomgaerde Lichtervelde.',

    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: false,
            follow: true,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    applicationName: "VZW Ten Boomgaerde Lichtervelde",
    keywords: ["Ten Boomgaerde", "Lichtervelde", "VZW"],

    creator: "WEB4YOU",
    publisher: "WEB4YOU",
    authors: [{name: "Jens Penneman", url: "https://jenspenneman.com"}],

    formatDetection: {
        url: false,
        email: false,
        telephone: false,
        address: false,
        date: false,
    },

    metadataBase: new URL("https://www.vzwtenboomgaerdelichtervelde.be"),
    referrer: "origin-when-cross-origin",
    alternates: {
        canonical: "/dashboard/zalen/blokken",
        languages: {},
    },

    appleWebApp: {
        title: "VZW Ten Boomgaerde Lichtervelde",
        statusBarStyle: "default",
    },

    generator: "Next.js",
};

export default async function page() {
    const supabase = createClient()
    const query = supabase.from("products").select(`id, name, price, for_sale, categories(name)`)
    const products: DbResult<typeof query> = await query

    if (!products.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div className={"flex flex-col md:flex-row gap-2 p-4"}>
            <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Producten</h1>
            <Link href={"/dashboard/producten/add"} className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><PlusCircle size={16}/>Toevoegen</Link>
        </div>
        <ProductsTable products={products.data}/>
    </main>
}