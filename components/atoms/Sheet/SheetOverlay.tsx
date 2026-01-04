"use client";

import { Overlay } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SheetOverlay = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Overlay>) => (
    <Overlay
        className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
            className
        )}
        data-slot="sheet-overlay"
        {...props}
    />
);

export default SheetOverlay;
