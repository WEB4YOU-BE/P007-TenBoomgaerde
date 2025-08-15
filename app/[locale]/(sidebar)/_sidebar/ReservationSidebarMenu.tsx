"use client";

import {
    CalendarCheckIcon,
    CalendarPlusIcon,
    CaretDownIcon,
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
} from "@/components/atoms/Sidebar";
import { usePathname } from "@/i18n/navigation";
import getUser from "@/service/authentication/getUser";

const ReservationSidebarMenu = () => {
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
                        Reserveringen
                        <CaretDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === "/reservate/"}
                                >
                                    <Link href="/reservate/">
                                        <CalendarPlusIcon />
                                        <span>Reserveren</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={
                                        pathname === "/account/reservations/"
                                    }
                                >
                                    <Link href="/account/reservations/">
                                        <CalendarCheckIcon />
                                        <span>Mijn reserveringen</span>
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

export default ReservationSidebarMenu;
