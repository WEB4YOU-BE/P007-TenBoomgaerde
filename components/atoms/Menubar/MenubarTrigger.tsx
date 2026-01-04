"use client";

import { Trigger } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const MenubarTrigger = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Trigger
        className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
            className
        )}
        data-slot="menubar-trigger"
        {...props}
    />
);

export default MenubarTrigger;
