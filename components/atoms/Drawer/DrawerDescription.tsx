"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const DrawerDescription = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>) => (
    <DrawerPrimitive.Description
        className={cn("text-muted-foreground text-sm", className)}
        data-slot="drawer-description"
        {...props}
    />
);

export default DrawerDescription;
