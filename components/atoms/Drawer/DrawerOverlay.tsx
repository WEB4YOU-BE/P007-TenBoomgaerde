"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const DrawerOverlay = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>) => (
    <DrawerPrimitive.Overlay
        className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
            className
        )}
        data-slot="drawer-overlay"
        {...props}
    />
);

export default DrawerOverlay;
