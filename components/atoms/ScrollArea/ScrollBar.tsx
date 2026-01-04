"use client";

import {
    ScrollAreaScrollbar,
    ScrollAreaThumb,
} from "@radix-ui/react-scroll-area";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const ScrollBar = ({
    className,
    orientation = "vertical",
    ...props
}: ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>) => (
    <ScrollAreaScrollbar
        className={cn(
            "flex touch-none p-px transition-colors select-none",
            orientation === "vertical" &&
                "h-full w-2.5 border-l border-l-transparent",
            orientation === "horizontal" &&
                "h-2.5 flex-col border-t border-t-transparent",
            className
        )}
        data-slot="scroll-area-scrollbar"
        orientation={orientation}
        {...props}
    >
        <ScrollAreaThumb
            className="bg-border relative flex-1 rounded-full"
            data-slot="scroll-area-thumb"
        />
    </ScrollAreaScrollbar>
);

export default ScrollBar;
