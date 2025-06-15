"use client";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { Check } from "@phosphor-icons/react/dist/ssr";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import React, { type ComponentPropsWithoutRef } from "react";

const Checkbox = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) => {
    return (
        <CheckboxPrimitive.Root
            className={cn(
                "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-4 shrink-0 rounded-[4px] border shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0",
                className
            )}
            data-slot="checkbox"
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className="flex items-center justify-center text-current"
                data-slot="checkbox-indicator"
            >
                <Check className="size-3.5" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
};

export { Checkbox };
