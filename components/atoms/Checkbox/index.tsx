"use client";

import { CheckIcon } from "@phosphor-icons/react/ssr";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Checkbox: FC<ComponentPropsWithoutRef<typeof Root>> = ({
    className,
    ...props
}) => (
    <Root
        className={cn(
            "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-4 shrink-0 rounded-[4px] border shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0",
            className
        )}
        data-slot="checkbox"
        {...props}
    >
        <Indicator
            className="flex items-center justify-center text-current"
            data-slot="checkbox-indicator"
        >
            <CheckIcon className="size-3.5" />
        </Indicator>
    </Root>
);

export default Checkbox;
