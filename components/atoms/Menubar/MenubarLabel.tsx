"use client";

import { Label } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const MenubarLabel = ({
    className,
    inset,
    ...props
}: ComponentPropsWithoutRef<typeof Label> & { inset?: boolean }) => (
    <Label
        className={cn(
            "px-2 py-1.5 text-sm font-semibold data-[inset]:pl-8",
            className
        )}
        data-inset={inset}
        data-slot="menubar-label"
        {...props}
    />
);

export default MenubarLabel;
