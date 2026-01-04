"use client";

import { Root } from "@radix-ui/react-separator";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Separator = ({
    className,
    decorative = true,
    orientation = "horizontal",
    ...props
}: ComponentPropsWithoutRef<typeof Root>) => (
    <Root
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

export default Separator;
