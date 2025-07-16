"use client";

import { AtIcon, HouseIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/atoms/Sidebar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/atoms/tooltip";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

const SidebarHeaderMenu = () => {
    const pathname = usePathname();

    return (
        <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                    <Link href="/">
                        <HouseIcon className="size-5" />
                        <span className="text-base font-semibold">
                            Ten Boomgaerde
                        </span>
                    </Link>
                </SidebarMenuButton>
                <Tooltip>
                    <TooltipTrigger className="group-data-[collapsible=icon]:hidden">
                        <Link
                            className={cn(
                                buttonVariants({
                                    size: "icon",
                                    variant: "ghost",
                                }),
                                "size-8"
                            )}
                            href={"mailto:info@vzwtenboomgaerdelichtervelde.be"}
                        >
                            <AtIcon />
                            <span className="sr-only">Inbox</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent
                        align="end"
                        className="flex flex-col justify-center"
                        side="bottom"
                        updatePositionStrategy="always"
                    >
                        <p>Stuur ons een e-mail</p>
                    </TooltipContent>
                </Tooltip>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default SidebarHeaderMenu;
