"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import { Command as CommandPrimitive } from "cmdk";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CommandInput = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Input>) => (
    <div
        className="flex h-9 items-center gap-2 border-b px-3"
        data-slot="command-input-wrapper"
    >
        <MagnifyingGlassIcon className="size-4 shrink-0 opacity-50" />
        <CommandPrimitive.Input
            className={cn(
                "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            data-slot="command-input"
            {...props}
        />
    </div>
);

export default CommandInput;
