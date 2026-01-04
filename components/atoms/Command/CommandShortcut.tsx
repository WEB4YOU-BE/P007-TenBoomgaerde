"use client";

import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CommandShortcut = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"span">) => (
    <span
        className={cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            className
        )}
        data-slot="command-shortcut"
        {...props}
    />
);

export default CommandShortcut;
