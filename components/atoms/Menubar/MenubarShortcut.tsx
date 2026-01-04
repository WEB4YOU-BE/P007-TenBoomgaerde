"use client";

import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const MenubarShortcut = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"span">) => (
    <span
        className={cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            className
        )}
        data-slot="menubar-shortcut"
        {...props}
    />
);

export default MenubarShortcut;
