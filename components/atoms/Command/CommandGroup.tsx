"use client";

import { Command as CommandPrimitive } from "cmdk";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CommandGroup = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) => (
    <CommandPrimitive.Group
        className={cn(
            "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
            className
        )}
        data-slot="command-group"
        {...props}
    />
);

export default CommandGroup;
