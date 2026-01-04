"use client";

import { Label } from "@radix-ui/react-context-menu";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const ContextMenuLabel = ({
    className,
    inset,
    ...props
}: ComponentPropsWithoutRef<typeof Label> & { inset?: boolean }) => (
    <Label
        className={cn(
            "text-foreground px-2 py-1.5 text-sm font-semibold data-[inset]:pl-8",
            className
        )}
        data-inset={inset}
        data-slot="context-menu-label"
        {...props}
    />
);

export default ContextMenuLabel;
