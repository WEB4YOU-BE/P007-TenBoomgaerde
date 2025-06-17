"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import React, { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Switch = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>) => {
    return (
        <SwitchPrimitive.Root
            className={cn(
                "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-hidden focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0",
                className
            )}
            data-slot="switch"
            {...props}
        >
            <SwitchPrimitive.Thumb
                className={cn(
                    "bg-background pointer-events-none block size-4 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
                )}
                data-slot="switch-thumb"
            />
        </SwitchPrimitive.Root>
    );
};

export { Switch };
