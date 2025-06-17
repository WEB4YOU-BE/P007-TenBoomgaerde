"use client";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { Circle } from "@phosphor-icons/react/dist/ssr";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import React, { ComponentPropsWithoutRef } from "react";

const RadioGroup = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid gap-3", className)}
            data-slot="radio-group"
            {...props}
        />
    );
};

const RadioGroupItem = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) => {
    return (
        <RadioGroupPrimitive.Item
            className={cn(
                "border-input text-primary ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0",
                className
            )}
            data-slot="radio-group-item"
            {...props}
        >
            <RadioGroupPrimitive.Indicator
                className="relative flex items-center justify-center"
                data-slot="radio-group-indicator"
            >
                <Circle className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
};

export { RadioGroup, RadioGroupItem };
