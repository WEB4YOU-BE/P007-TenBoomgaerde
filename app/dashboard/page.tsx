import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/Hover-card";
import DashboardReservationsHoldTable
    from "@/components/business/reservations/dashboard/dashboard-reservations-hold-table";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";

export const metadata = {
    title: "Dashboard",
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
        canonical: "/dashboard",
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

function getMonthDates() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {start, end};
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
    const queryHold = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd, organizations(name), remarks`).eq('status', 'in afwachting').order('start_date')
    const queryWeak = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd, organizations(name), remarks`).gte('start_date', formatDate({date: getWeekDates().start})).lte('end_date', formatDate({date: getWeekDates().end})).order('start_date')
    const queryMonth = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd, organizations(name), remarks`).gte('start_date', formatDate({date: getMonthDates().start})).lte('end_date', formatDate({date: getMonthDates().end})).order('start_date')
    const queryInvoice = supabase.from("reservations").select(`id, reservation_year, reservation_number, users(id, firstname, lastname), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd, organizations(name), remarks`).eq('gefactureerd', 'FALSE').eq('status', 'goedgekeurd').order('start_date')

    const reservationsHold: DbResult<typeof queryHold> = await queryHold
    const reservationsWeak: DbResult<typeof queryWeak> = await queryWeak
    const reservationsMonth: DbResult<typeof queryMonth> = await queryMonth
    const reservationsInvoice: DbResult<typeof queryInvoice> = await queryInvoice

    if (!reservationsHold.data) return undefined
    if (!reservationsWeak.data) return undefined
    if (!reservationsMonth.data) return undefined
    if (!reservationsInvoice.data) return undefined

    return <main className={"flex flex-col gap-2"}>
        <div className={"px-4 py-6"}>
            <div className={"flex flex-col-reverse lg:flex-row gap-4 min-w-full"}>
                <div className={"flex flex-col gap-4 flex-auto lg:flex-grow"}>
                    <div
                        className={"p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 lg:max-h-[415px] overflow-y-auto"}>
                        <Tabs defaultValue={"Deze week"}>
                            <div className={"mb-4 border-b border-gray-200"}>
                                <TabsList className={"flex flex-wrap -mb-px text-sm font-medium text-center"}>
                                    <div className={"mr-2"}>
                                        <TabsTrigger value={"Deze week"}
                                                     className={"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-green-600 data-[state=active]:border-green-600"}>Deze
                                            week</TabsTrigger>
                                    </div>
                                    <div className={"mr-2"}>
                                        <TabsTrigger value={"Te controleren"}
                                                     className={"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-green-600 data-[state=active]:border-green-600"}>Te
                                            controleren</TabsTrigger>
                                    </div>
                                    <div className={"mr-2"}>
                                        <TabsTrigger value={"Te factureren"}
                                                     className={"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-green-600 data-[state=active]:border-green-600"}>Te
                                            factureren</TabsTrigger>
                                    </div>
                                    <div className={"mr-2"}>
                                        <TabsTrigger value={"Deze maand"}
                                                     className={"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-green-600 data-[state=active]:border-green-600"}>Deze
                                            maand
                                        </TabsTrigger>
                                    </div>
                                </TabsList>
                            </div>
                            <TabsContent value={"Deze week"}>
                                <DashboardReservationsHoldTable reservations={reservationsWeak.data}/>
                            </TabsContent>
                            <TabsContent value={"Te controleren"}>
                                <DashboardReservationsHoldTable reservations={reservationsHold.data}/>
                            </TabsContent>
                            <TabsContent value={"Te factureren"}>
                                <DashboardReservationsHoldTable reservations={reservationsInvoice.data}/>
                            </TabsContent>
                            <TabsContent value={"Deze maand"}>
                                <DashboardReservationsHoldTable reservations={reservationsMonth.data}/>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div
                        className={"p-4 border border-gray-200 rounded-lg shadow-sm col-span-2 xl:col-span-3 2xl:col-span-4 sm:p-6 xl:row-span-2 flex-grow"}>
                        <div className="flex flex-col justify-between mb-4">
                            <div className="flex-shrink-0">
                                <h3
                                    className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">Reserveringen</h3>
                            </div>
                            <span>Hier komt nog een grafiek</span>
                            {/*<div
                            className="flex items-center justify-end flex-1 text-base font-medium text-green-500 dark:text-green-400">
                            12.5%
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                      clip-rule="evenodd"></path>
                            </svg>
                        </div>*/}
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-row lg:flex-col gap-4 flex-grow"}>
                        <div className={"p-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 flex-1"}>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <h2 className={"pb-2 mb-4 text-lg font-semibold text-center border-b border-gray-200 flex-auto"}>Te
                                        controleren</h2>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <p>Dit zijn de te controleren reserveringen.</p>
                                </HoverCardContent>
                            </HoverCard>
                            <p className={"text-6xl font-bold text-green-600 sm:text-7xl text-center"}>{reservationsHold.data.length}</p>
                        </div>
                        <div className={"p-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 flex-1"}>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <h2 className={"pb-2 mb-4 text-lg font-semibold text-center border-b border-gray-200 flex-auto"}>Te
                                        factureren</h2>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <p>Dit zijn de te factureren reserveringen.</p>
                                </HoverCardContent>
                            </HoverCard>
                            <p className={"text-6xl font-bold text-green-600 sm:text-7xl text-center"}>{reservationsInvoice.data.length}</p>
                        </div>
                    </div>
                    <div className={"flex flex-row lg:flex-col gap-4 flex-grow"}>
                        <div className={"p-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 flex-1"}>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <h2 className={"pb-2 mb-4 text-lg font-semibold text-center border-b border-gray-200"}>
                                        Reserveringen deze week
                                    </h2>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <p>Dit zijn de reserveringen vanaf maandag deze week.</p>
                                </HoverCardContent>
                            </HoverCard>
                            <p className={"text-6xl font-bold text-green-600 sm:text-7xl text-center"}>{reservationsWeak.data.length}</p>
                        </div>
                        <div className={"p-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 flex-1"}>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <h2 className={"pb-2 mb-4 text-lg font-semibold text-center border-b border-gray-200"}>
                                        Reserveringen deze maand
                                    </h2>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <p>Dit zijn de reserveringen vanaf maandag deze week.</p>
                                </HoverCardContent>
                            </HoverCard>
                            <p className={"text-6xl font-bold text-green-600 sm:text-7xl text-center"}>{reservationsMonth.data.length}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
}