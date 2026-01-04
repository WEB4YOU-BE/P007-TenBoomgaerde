"use client";

import { Root } from "@radix-ui/react-radio-group";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const RadioGroup = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Root>) => (
    <Root
        className={cn("grid gap-3", className)}
        data-slot="radio-group"
        {...props}
    />
);

export default RadioGroup;
