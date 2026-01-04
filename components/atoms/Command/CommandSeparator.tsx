"use client";

import { Command as CommandPrimitive } from "cmdk";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CommandSeparator = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>) => (
    <CommandPrimitive.Separator
        className={cn("bg-border -mx-1 h-px", className)}
        data-slot="command-separator"
        {...props}
    />
);

export default CommandSeparator;
