"use client";

import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const ContextMenuShortcut = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"span">) => (
    <span
        className={cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            className
        )}
        data-slot="context-menu-shortcut"
        {...props}
    />
);

export default ContextMenuShortcut;
