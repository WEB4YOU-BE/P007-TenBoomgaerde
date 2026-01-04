"use client";

import { Title } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SheetTitle = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Title>) => (
    <Title
        className={cn(
            "text-foreground font-semibold tracking-tight",
            className
        )}
        data-slot="sheet-title"
        {...props}
    />
);

export default SheetTitle;
