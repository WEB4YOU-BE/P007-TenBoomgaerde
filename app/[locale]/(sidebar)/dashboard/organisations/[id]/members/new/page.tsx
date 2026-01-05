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
import Separator from "@/components/atoms/Separator";
import { SidebarTrigger } from "@/components/atoms/Sidebar";

import AddMemberForm from "./form";

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
    const { id } = await params;

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
                            <BreadcrumbLink href="/dashboard/">
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/organisations/">
                                Organisaties
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href={`/dashboard/organisations/${id}`}
                            >
                                Bewerken
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Lid toevoegen</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <main className="container mx-auto max-w-5xl p-2">
                <AddMemberForm organisationId={id} />
            </main>
        </div>
    );
};

export default Page;
