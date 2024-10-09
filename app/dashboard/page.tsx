import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/atoms/hover-card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/atoms/tabs";
import React from "react";

import {
    fetchReservationsThisMonth,
    fetchReservationsThisMonthCount,
    fetchReservationsThisWeek,
    fetchReservationsThisWeekCount,
    fetchReservationsToBeInvoiced,
    fetchReservationsToBeInvoicedCount,
    fetchReservationsToBeReviewed,
    fetchReservationsToBeReviewedCount,
} from "./actions";
import { columns, DataTable } from "./reservations/table";

export const dynamic = "force-dynamic";

export default async function Page() {
    const reservationsThisWeek = await fetchReservationsThisWeek();
    const reservationsThisMonth = await fetchReservationsThisMonth();
    const reservationsToBeReviewed = await fetchReservationsToBeReviewed();
    const reservationsToBeInvoiced = await fetchReservationsToBeInvoiced();

    return (
        <div className={"flex flex-row gap-2 h-full"}>
            <Tabs className="grow" defaultValue="Deze week">
                <TabsList className={"flex flex-wrap sticky top-0"}>
                    <TabsTrigger value={"Deze week"}>Deze week</TabsTrigger>
                    <TabsTrigger value={"Deze maand"}>Deze maand</TabsTrigger>
                    <TabsTrigger value={"Te controleren"}>
                        Te controleren
                    </TabsTrigger>
                    <TabsTrigger value={"Te factureren"}>
                        Te factureren
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="Deze week">
                    <DataTable columns={columns} data={reservationsThisWeek} />
                </TabsContent>
                <TabsContent value="Deze maand">
                    <DataTable columns={columns} data={reservationsThisMonth} />
                </TabsContent>
                <TabsContent value="Te controleren">
                    <DataTable
                        columns={columns}
                        data={reservationsToBeReviewed}
                    />
                </TabsContent>
                <TabsContent value="Te factureren">
                    <DataTable
                        columns={columns}
                        data={reservationsToBeInvoiced}
                    />
                </TabsContent>
            </Tabs>
            <div className={"flex flex-col gap-4 h-full sticky top-0"}>
                <div className={"flex flex-row lg:flex-col gap-4 flex-grow"}>
                    <div
                        className={
                            "p-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 flex-1"
                        }
                    >
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <h2
                                    className={
                                        "pb-2 mb-4 text-lg font-semibold text-center border-b border-gray-200 flex-auto"
                                    }
                                >
                                    Te controleren
                                </h2>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>Dit zijn de te controleren reserveringen.</p>
                            </HoverCardContent>
                        </HoverCard>
                        <p
                            className={
                                "text-6xl font-bold text-green-600 sm:text-7xl text-center"
                            }
                        >
                            {fetchReservationsToBeReviewedCount()}
                        </p>
                    </div>
                    <div
                        className={
                            "p-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 flex-1"
                        }
                    >
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <h2
                                    className={
                                        "pb-2 mb-4 text-lg font-semibold text-center border-b border-gray-200 flex-auto"
                                    }
                                >
                                    Te factureren
                                </h2>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>Dit zijn de te factureren reserveringen.</p>
                            </HoverCardContent>
                        </HoverCard>
                        <p
                            className={
                                "text-6xl font-bold text-green-600 sm:text-7xl text-center"
                            }
                        >
                            {fetchReservationsToBeInvoicedCount()}
                        </p>
                    </div>
                </div>
                <div className={"flex flex-row lg:flex-col gap-4 flex-grow"}>
                    <div
                        className={
                            "p-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 flex-1"
                        }
                    >
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <h2
                                    className={
                                        "pb-2 mb-4 text-lg font-semibold text-center border-b border-gray-200"
                                    }
                                >
                                    Reserveringen deze week
                                </h2>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>
                                    Dit zijn de reserveringen vanaf maandag deze
                                    week.
                                </p>
                            </HoverCardContent>
                        </HoverCard>
                        <p
                            className={
                                "text-6xl font-bold text-green-600 sm:text-7xl text-center"
                            }
                        >
                            {fetchReservationsThisWeekCount()}
                        </p>
                    </div>
                    <div
                        className={
                            "p-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 flex-1"
                        }
                    >
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <h2
                                    className={
                                        "pb-2 mb-4 text-lg font-semibold text-center border-b border-gray-200"
                                    }
                                >
                                    Reserveringen deze maand
                                </h2>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>
                                    Dit zijn de reserveringen vanaf maandag deze
                                    week.
                                </p>
                            </HoverCardContent>
                        </HoverCard>
                        <p
                            className={
                                "text-6xl font-bold text-green-600 sm:text-7xl text-center"
                            }
                        >
                            {fetchReservationsThisMonthCount()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
