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
import { Separator } from "@/components/atoms/separator";
import { SidebarTrigger } from "@/components/atoms/Sidebar";

import Table from "./table";

interface PageProps {
    params: Promise<{ id: string }>;
}
const Page: NextPage<PageProps> = async ({ params }: PageProps) => {
    const paramData = await params;
    const organisationId = paramData.id;

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
                        <BreadcrumbItem>Account</BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Mijn reserveringen</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <main className="p-2">
                <Table organisationId={organisationId} />
            </main>
        </div>
    );
};

export default Page;
