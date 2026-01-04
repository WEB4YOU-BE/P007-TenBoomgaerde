"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const DrawerTitle = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>) => (
    <DrawerPrimitive.Title
        className={cn(
            "text-foreground font-semibold tracking-tight",
            className
        )}
        data-slot="drawer-title"
        {...props}
    />
);

export default DrawerTitle;
