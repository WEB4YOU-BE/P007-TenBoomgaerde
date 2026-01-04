"use client";

import { Content } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

import MenubarPortal from "./MenubarPortal";

const MenubarContent = ({
    align = "start",
    alignOffset = -4,
    className,
    sideOffset = 8,
    ...props
}: ComponentPropsWithoutRef<typeof Content>) => (
    <MenubarPortal>
        <Content
            align={align}
            alignOffset={alignOffset}
            className={cn(
                "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md",
                className
            )}
            data-slot="menubar-content"
            sideOffset={sideOffset}
            {...props}
        />
    </MenubarPortal>
);

export default MenubarContent;
