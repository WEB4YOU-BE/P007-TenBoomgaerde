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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/atoms/tooltip";
import { usePathname } from "@/i18n/navigation";
import getUser from "@/service/authentication/getUser";
import getMyOrganisations from "@/service/organisations/getMyOrganisations";

const OrganisationSidebarMenu = () => {
    const pathname = usePathname();

    const { data: user, isFetching: isFetchingUser } = useQuery({
        queryFn: getUser,
        queryKey: ["authenticatedUser"],
    });

    const { data: organisations } = useQuery({
        enabled: !!user?.id,
        queryFn: getMyOrganisations,
        queryKey: ["myOrganisations"],
    });

    if (isFetchingUser) return <LoadingSidebarMenu items={2} />;

    if (!user?.id) return null;

    return (
        <Collapsible className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        Mijn organisaties
                        <CaretDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {organisations?.map((organisation) => (
                                <Collapsible
                                    className="group/collapsible-org"
                                    key={organisation.id}
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton asChild>
                                                <span>
                                                    <BuildingOfficeIcon />
                                                    <span>
                                                        {organisation.name}
                                                    </span>
                                                    <CaretDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible-org:rotate-180" />
                                                </span>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={
                                                            pathname ===
                                                            `/organisations/${organisation.id}/reservations/`
                                                        }
                                                    >
                                                        <Link
                                                            href={`/organisations/${organisation.id}/reservations/`}
                                                        >
                                                            <span>
                                                                Reserveringen
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={
                                                            pathname ===
                                                            `/organisations/${organisation.id}/members/`
                                                        }
                                                    >
                                                        <Link
                                                            href={`/organisations/${organisation.id}/members/`}
                                                        >
                                                            <span>Leden</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                            <SidebarMenuItem>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <SidebarMenuButton
                                            asChild
                                            disabled
                                            isActive={
                                                pathname ===
                                                "/organisations/new/"
                                            }
                                        >
                                            <Link
                                                aria-disabled
                                                href="/organisations/new/"
                                            >
                                                <PlusIcon />
                                                <span>
                                                    Organisatie aanvragen
                                                </span>
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

export default OrganisationSidebarMenu;
