import { NextPage } from "next";
import React from "react";

import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/atoms/Breadcrumb";
import Breadcrumb from "@/components/atoms/Breadcrumb/Breadcrumb";
import {
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import Card from "@/components/atoms/Card/Card";
import { Separator } from "@/components/atoms/separator";
import { SidebarTrigger } from "@/components/atoms/Sidebar";

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
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Te controleren</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                12
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Te factureren</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                208
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Deze week</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                7
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Deze maand</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                17
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Page;
