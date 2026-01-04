"use client";

import { Item } from "@radix-ui/react-context-menu";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const ContextMenuItem = ({
    className,
    inset,
    variant = "default",
    ...props
}: ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}) => (
    <Item
        className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
        )}
        data-inset={inset}
        data-slot="context-menu-item"
        data-variant={variant}
        {...props}
    />
);

export default ContextMenuItem;
