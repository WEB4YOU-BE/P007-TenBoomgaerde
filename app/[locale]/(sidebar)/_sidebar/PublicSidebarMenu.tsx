"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { SidebarGroup, SidebarGroupLabel } from "@/components/atoms/Sidebar";
import getUser from "@/service/authentication/getUser";

const PublicSidebarMenu = () => {
    const { data: user, isFetching: isFetchingUser } = useQuery({
        queryFn: getUser,
        queryKey: ["authenticatedUser"],
    });

    if (isFetchingUser) return null;

    if (user?.id) return null;

    return (
        <SidebarGroup className="h-full">
            <SidebarGroupLabel className="h-full flex flex-col justify-center">
                Meld u aan bij uw account of maak een nieuw account aan om
                toegang te krijgen tot de functies van de website.
            </SidebarGroupLabel>
        </SidebarGroup>
    );
};

export default PublicSidebarMenu;
