"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import React, { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Separator = ({
    className,
    decorative = true,
    orientation = "horizontal",
    ...props
}: ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>) => {
    return (
        <SeparatorPrimitive.Root
            className={cn(
                "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
                className
            )}
            data-slot="separator-root"
            decorative={decorative}
            orientation={orientation}
            {...props}
        />
    );
};

export { Separator };
