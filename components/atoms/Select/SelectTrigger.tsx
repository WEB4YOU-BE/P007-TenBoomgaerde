"use client";

import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { Icon, Trigger } from "@radix-ui/react-select";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SelectTrigger = ({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Trigger
        className={cn(
            "border-input data-[placeholder]:text-muted-foreground aria-invalid:border-destructive ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>span]:line-clamp-1",
            className
        )}
        data-slot="select-trigger"
        {...props}
    >
        {children}
        <Icon asChild>
            <CaretDownIcon className="size-4 opacity-50" />
        </Icon>
    </Trigger>
);

export default SelectTrigger;
