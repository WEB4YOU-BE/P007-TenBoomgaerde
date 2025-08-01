"use client";

import { NextPage } from "next";
import React from "react";

import CounterCard from "@/app/[locale]/(sidebar)/dashboard/counter";
import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/atoms/Breadcrumb";
import Breadcrumb from "@/components/atoms/Breadcrumb/Breadcrumb";
import { Separator } from "@/components/atoms/separator";
import { SidebarTrigger } from "@/components/atoms/Sidebar";
import getReservationCountForThisMonth from "@/service/reservations/getReservationCountForThisMonth";
import getReservationCountForThisWeek from "@/service/reservations/getReservationCountForThisWeek";
import getReservationCountPending from "@/service/reservations/getReservationCountPending";
import getReservationCountToInvoice from "@/service/reservations/getReservationCountToInvoice";

const Page: NextPage = () => {
    return (
        <div className="flex flex-col">
            <div className="sticky top-0 z-50 flex w-full items-center border-b p-2 gap-4 rounded-t-2xl bg-background">
                <SidebarTrigger />
                <Separator orientation="vertical" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                Ten Boomgaerde
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <main className="@container/main flex flex-1 flex-col gap-2 py-4">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <CounterCard
                        cardTitle="Te controleren reserveringen"
                        queryFn={getReservationCountPending}
                    />
                    <CounterCard
                        cardTitle="Te factureren reserveringen"
                        queryFn={getReservationCountToInvoice}
                    />
                    <CounterCard
                        cardTitle="Reserveringen deze week"
                        queryFn={getReservationCountForThisWeek}
                    />
                    <CounterCard
                        cardTitle="Reserveringen deze maand"
                        queryFn={getReservationCountForThisMonth}
                    />
                </div>
            </main>
        </div>
    );
};

export default Page;
