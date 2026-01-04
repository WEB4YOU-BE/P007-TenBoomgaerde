"use client";

import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SheetFooter = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => (
    <div
        className={cn("mt-auto flex flex-col gap-2 p-4", className)}
        data-slot="sheet-footer"
        {...props}
    />
);

export default SheetFooter;
