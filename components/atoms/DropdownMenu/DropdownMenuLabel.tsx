"use client";

import { Label } from "@radix-ui/react-dropdown-menu";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const DropdownMenuLabel = ({
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
        data-slot="dropdown-menu-label"
        {...props}
    />
);

export default DropdownMenuLabel;
