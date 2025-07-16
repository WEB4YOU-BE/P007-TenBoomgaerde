"use client";

import type { VariantProps } from "class-variance-authority";

import { Slot } from "@radix-ui/react-slot";
import React, { type ComponentPropsWithRef } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/atoms/tooltip";
import useSidebar from "@/hooks/use-sidebar";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import sidebarMenuButtonVariants from "@/utils/tailwindcss/variants/sidebarMenuButtonVariants";

interface SidebarMenuButtonProps
    extends ComponentPropsWithRef<"button">,
        VariantProps<typeof sidebarMenuButtonVariants> {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: ComponentPropsWithRef<typeof TooltipContent> | string;
}
const SidebarMenuButton = ({
    asChild = false,
    className,
    isActive = false,
    size = "default",
    tooltip,
    variant = "default",
    ...props
}: SidebarMenuButtonProps) => {
    const Component = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
        <Component
            className={cn(
                sidebarMenuButtonVariants({ size, variant }),
                className
            )}
            data-active={isActive}
            data-sidebar="menu-button"
            data-size={size}
            data-slot="sidebar-menu-button"
            {...props}
        />
    );

    if (!tooltip) return button;

    if (typeof tooltip === "string") tooltip = { children: tooltip };

    return (
        <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent
                align="center"
                hidden={state !== "collapsed" || isMobile}
                side="right"
                {...tooltip}
            />
        </Tooltip>
    );
};

export default SidebarMenuButton;
