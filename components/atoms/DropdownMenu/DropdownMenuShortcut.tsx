"use client";

import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const DropdownMenuShortcut = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"span">) => (
    <span
        className={cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            className
        )}
        data-slot="dropdown-menu-shortcut"
        {...props}
    />
);

export default DropdownMenuShortcut;
