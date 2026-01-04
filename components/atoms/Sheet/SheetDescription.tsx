"use client";

import { Description } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SheetDescription = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Description>) => (
    <Description
        className={cn("text-muted-foreground text-sm", className)}
        data-slot="sheet-description"
        {...props}
    />
);

export default SheetDescription;
