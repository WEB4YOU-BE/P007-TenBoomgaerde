"use client";

import { Separator } from "@radix-ui/react-select";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SelectSeparator = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Separator>) => (
    <Separator
        className={cn(
            "bg-border pointer-events-none -mx-1 my-1 h-px",
            className
        )}
        data-slot="select-separator"
        {...props}
    />
);

export default SelectSeparator;
