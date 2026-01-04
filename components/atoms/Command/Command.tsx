"use client";

import { Command as CommandPrimitive } from "cmdk";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Command = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive>) => (
    <CommandPrimitive
        className={cn(
            "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
            className
        )}
        data-slot="command"
        {...props}
    />
);

export default Command;
