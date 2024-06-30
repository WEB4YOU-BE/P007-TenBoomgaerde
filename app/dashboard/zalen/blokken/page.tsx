import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import Link from "next/link";
import { cn } from "@/utils/tailwindcss/MergeCN";
import {buttonVariants} from "@/components/atoms/button";
import {PlusCircle} from "lucide-react";
import BloksTable from "@/components/business/reservations/bloks/bloks-table";

export const metadata = {
    title: "Blokken",
    description: 'Ga naar jouw overzicht met alle reserveren VZW Ten Boomgaerde Lichtervelde.',

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
    const query = supabase.from("bloks").select().order('start_hour')
    const bloks: DbResult<typeof query> = await query

    if (!bloks.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div>
            <div className={"flex flex-col md:flex-row gap-2 p-4"}>
                <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Blokken</h1>
                <Link href={"/dashboard/zalen/blokken/add"}
                      className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><PlusCircle size={16}/>Toevoegen</Link>
            </div>
            <BloksTable bloks={bloks.data}/>
        </div>
    </main>
}