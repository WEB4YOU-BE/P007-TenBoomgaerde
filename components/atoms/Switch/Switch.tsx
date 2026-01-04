"use client";

import { Root, Thumb } from "@radix-ui/react-switch";
import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Switch = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Root>) => (
    <Root
        className={cn(
            "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/20 inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-hidden focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        data-slot="switch"
        {...props}
    >
        <Thumb
            className={cn(
                "bg-background pointer-events-none block size-4 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
            )}
            data-slot="switch-thumb"
        />
    </Root>
);

export default Switch;
