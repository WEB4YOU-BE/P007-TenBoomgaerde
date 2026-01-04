"use client";

import { Root } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Menubar = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Root>) => (
    <Root
        className={cn(
            "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
            className
        )}
        data-slot="menubar"
        {...props}
    />
);

export default Menubar;
