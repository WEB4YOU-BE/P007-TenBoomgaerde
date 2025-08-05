"use client";

import {
    BarcodeIcon,
    BuildingOfficeIcon,
    CalendarCheckIcon,
    CaretDownIcon,
    ClockIcon,
    DoorIcon,
    LayoutIcon,
    TagIcon,
    UsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useCallback } from "react";

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
    SidebarSeparator,
} from "@/components/atoms/Sidebar";
import { usePathname } from "@/i18n/navigation";
import getUser from "@/service/authentication/getUser";
import isAdmin from "@/service/authentication/isAdmin";

const DashboardSidebarMenu = () => {
    const pathname = usePathname();

    const { data: user, isFetching: isFetchingUser } = useQuery({
        queryFn: getUser,
        queryKey: ["authenticatedUser"],
    });
    const getIsAdminByIdCallback = useCallback(
        async () => await isAdmin({ userID: user?.id || "" }),
        [user?.id]
    );
    const { data: isAdminReturn, isFetching: isFetchingIsAdmin } =
        useQuery<boolean>({
            enabled: !!user?.id,
            queryFn: getIsAdminByIdCallback,
            queryKey: ["isAdmin", user?.id],
        });

    if (isFetchingUser || (!!user?.id && isFetchingIsAdmin))
        return <LoadingSidebarMenu items={8} />;

    if (!isAdminReturn) return null;

    return (
        <Collapsible className="group/collapsible" defaultOpen>
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        Dashboard
                        <CaretDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === "/dashboard/"}
                                >
                                    <Link href="/dashboard/">
                                        <LayoutIcon />
                                        <span>Overzicht</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(
                                        "/dashboard/reservations/"
                                    )}
                                >
                                    <Link href="/dashboard/reservations/">
                                        <CalendarCheckIcon />
                                        <span>Reserveringen</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarSeparator />
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(
                                        "/dashboard/halls/"
                                    )}
                                >
                                    <Link href="/dashboard/halls/">
                                        <DoorIcon />
                                        <span>Zalen</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(
                                        "/dashboard/timeslots/"
                                    )}
                                >
                                    <Link href="/dashboard/timeslots/">
                                        <ClockIcon />
                                        <span>Tijdslots</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarSeparator />
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(
                                        "/dashboard/products/"
                                    )}
                                >
                                    <Link href="/dashboard/products/">
                                        <BarcodeIcon />
                                        <span>Producten</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(
                                        "/dashboard/categories/"
                                    )}
                                >
                                    <Link href="/dashboard/categories/">
                                        <TagIcon />
                                        <span>Categorieën</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarSeparator />
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(
                                        "/dashboard/organisations/"
                                    )}
                                >
                                    <Link href="/dashboard/organisations/">
                                        <BuildingOfficeIcon />
                                        <span>Organisaties</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(
                                        "/dashboard/users/"
                                    )}
                                >
                                    <Link href="/dashboard/users/">
                                        <UsersIcon />
                                        <span>Gebruikers</span>
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

export default DashboardSidebarMenu;
