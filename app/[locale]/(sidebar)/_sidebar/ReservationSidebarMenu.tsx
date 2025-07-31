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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/atoms/tooltip";
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
                        Reservaties
                        <CaretDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <SidebarMenuButton
                                            asChild
                                            disabled
                                            isActive={
                                                pathname === "/reservate/"
                                            }
                                        >
                                            <Link
                                                aria-disabled
                                                href="/reservate/"
                                            >
                                                <CalendarPlusIcon />
                                                <span>Reserveren</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="right"
                                        updatePositionStrategy="always"
                                    >
                                        Beschikbaar vanaf 15 augustus
                                    </TooltipContent>
                                </Tooltip>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <SidebarMenuButton
                                            asChild
                                            disabled
                                            isActive={
                                                pathname ===
                                                "/account/reservations/"
                                            }
                                        >
                                            <Link
                                                aria-disabled
                                                href="/account/reservations/"
                                            >
                                                <CalendarCheckIcon />
                                                <span>Mijn reserveringen</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="right"
                                        updatePositionStrategy="always"
                                    >
                                        Beschikbaar vanaf 15 augustus
                                    </TooltipContent>
                                </Tooltip>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );
};

export default ReservationSidebarMenu;
