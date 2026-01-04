"use client";

import { Indicator, Root } from "@radix-ui/react-progress";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Progress = ({
    className,
    value,
    ...props
}: ComponentPropsWithoutRef<typeof Root>) => (
    <Root
        className={cn(
            "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
            className
        )}
        data-slot="progress"
        {...props}
    >
        <Indicator
            className="bg-primary h-full w-full flex-1 transition-all"
            data-slot="progress-indicator"
            style={{ transform: `translateX(-${String(100 - (value ?? 0))}%)` }}
        />
    </Root>
);

export default Progress;
