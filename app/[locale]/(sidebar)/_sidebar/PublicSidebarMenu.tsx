"use client";

import { CurrencyEurIcon, GavelIcon } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import { default as NextLink } from "next/link";
import React from "react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/atoms/Sidebar";
import { Link, usePathname } from "@/i18n/navigation";
import getUser from "@/service/authentication/getUser";

const PublicSidebarMenu = () => {
    const pathname = usePathname();
    const { data: user, isFetching: isFetchingUser } = useQuery({
        queryFn: getUser,
        queryKey: ["authenticatedUser"],
    });

    return (
        <>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === "/prices/"}
                            >
                                <Link href="/prices/">
                                    <CurrencyEurIcon />
                                    <span>Prijzen</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <NextLink
                                    href="/documents/Reglement_vergaderzalen_Ten_Boomgaerde_vzw.pdf"
                                    target="_blank"
                                >
                                    <GavelIcon />
                                    <span>Reglement vergaderzalen</span>
                                </NextLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            {!isFetchingUser && !user?.id ? (
                <SidebarGroup className="h-full">
                    <SidebarGroupLabel className="h-full flex flex-col justify-center">
                        Meld u aan bij uw account of maak een nieuw account aan
                        om toegang te krijgen tot de functies van de website.
                    </SidebarGroupLabel>
                </SidebarGroup>
            ) : null}
        </>
    );
};

export default PublicSidebarMenu;
