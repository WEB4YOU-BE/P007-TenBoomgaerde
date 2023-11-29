import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {Printer} from "lucide-react";
import ReservationsTable from "@/components/business/reservations/reservations-table";

export const metadata = {
    title: "Analyses",
    description: 'Trek verschillende rapporten met data zoals de reservaties en gebruikers die aangemeld zijn.',

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

    colorScheme: "light dark",
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "#e7e5e4"},
        {media: "(prefers-color-scheme: dark)", color: "#292524"},
    ],
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
        canonical: "/dashboard/analyses",
        languages: {},
    },

    appleWebApp: {
        title: "VZW Ten Boomgaerde Lichtervelde",
        statusBarStyle: "default",
    },

    generator: "Next.js",
};

function getWeekDates() {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return {start, end}
}

function formatDate({date}: {
    date: Date
}) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const query = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status`).gte('start_date', formatDate({date: getWeekDates().start})).lte('end_date', formatDate({date: getWeekDates().end}))
    const reservations: DbResult<typeof query> = await query

    if (!reservations.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div className={"m-5 border border-gray-300 rounded-2xl p-2"}>
            <div className={"flex flex-col md:flex-row gap-2 p-4"}>
                <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Reservaties deze
                    week</h1>
                <Link href={"/dashboard/analyses/weekPDF"}
                      className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><Printer
                    size={16}/>Afdrukken</Link>
            </div>
            <ReservationsTable reservations={reservations.data}/>
        </div>
    </main>
}