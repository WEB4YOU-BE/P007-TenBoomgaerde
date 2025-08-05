"use client";

import {
    BuildingOfficeIcon,
    CaretDownIcon,
    PlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

import LoadingSidebarMenu from "@/app/[locale]/(sidebar)/_sidebar/Loading";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/atoms/collapsible";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/atoms/Sidebar";
import { usePathname } from "@/i18n/navigation";
import getUser from "@/service/authentication/getUser";

const OrganisationSidebarMenu = () => {
    const pathname = usePathname();

    const { data: user, isFetching: isFetchingUser } = useQuery({
        queryFn: getUser,
        queryKey: ["authenticatedUser"],
    });

    if (isFetchingUser) return <LoadingSidebarMenu items={2} />;

    if (!user?.id) return null;

    return (
        <Collapsible className="group/collapsible" defaultOpen>
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        Organisaties
                        <CaretDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/organisations/1/">
                                        <BuildingOfficeIcon />
                                        <span>Organisatie 1</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <Link href="/organisations/1/reservations/">
                                                <span>Reserveringen</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            asChild
                                            isActive={
                                                pathname ===
                                                "/organisations/1/members/"
                                            }
                                        >
                                            <Link href="/organisations/1/members/">
                                                <span>Leden</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === "/organisations/2/"}
                                >
                                    <Link href="/organisations/2/">
                                        <BuildingOfficeIcon />
                                        <span>Organisatie 2</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            asChild
                                            isActive={
                                                pathname ===
                                                "/organisations/1/reservations/"
                                            }
                                        >
                                            <Link href="/organisations/1/reservations/">
                                                <span>Reserveringen</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            asChild
                                            isActive={
                                                pathname ===
                                                "/organisations/1/members/"
                                            }
                                        >
                                            <Link href="/organisations/1/members/">
                                                <span>Leden</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={
                                        pathname === "/organisations/new/"
                                    }
                                >
                                    <Link href="/organisations/new/">
                                        <PlusIcon />
                                        <span>
                                            Nieuwe organisatie aanvragen
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );
};

export default OrganisationSidebarMenu;
