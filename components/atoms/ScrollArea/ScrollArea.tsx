"use client";

import { Corner, Root, Viewport } from "@radix-ui/react-scroll-area";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

import ScrollBar from "./ScrollBar";

const ScrollArea = ({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Root>) => (
    <Root
        className={cn("relative", className)}
        data-slot="scroll-area"
        {...props}
    >
        <Viewport
            className="ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1"
            data-slot="scroll-area-viewport"
        >
            {children}
        </Viewport>
        <ScrollBar />
        <Corner />
    </Root>
);

export default ScrollArea;
