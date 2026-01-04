"use client";

import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SheetHeader = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => (
    <div
        className={cn("flex flex-col gap-1.5 p-4", className)}
        data-slot="sheet-header"
        {...props}
    />
);

export default SheetHeader;
