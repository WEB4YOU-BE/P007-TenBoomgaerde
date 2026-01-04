"use client";

import { Label } from "@radix-ui/react-select";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SelectLabel = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Label>) => (
    <Label
        className={cn("px-2 py-1.5 text-sm font-semibold", className)}
        data-slot="select-label"
        {...props}
    />
);

export default SelectLabel;
