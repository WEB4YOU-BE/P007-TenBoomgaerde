"use client";

import { Separator } from "@radix-ui/react-context-menu";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const ContextMenuSeparator = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Separator>) => (
    <Separator
        className={cn("bg-border -mx-1 my-1 h-px", className)}
        data-slot="context-menu-separator"
        {...props}
    />
);

export default ContextMenuSeparator;
