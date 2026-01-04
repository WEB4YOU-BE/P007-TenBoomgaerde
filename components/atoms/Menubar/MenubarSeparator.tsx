"use client";

import { Separator } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const MenubarSeparator = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Separator>) => (
    <Separator
        className={cn("bg-border -mx-1 my-1 h-px", className)}
        data-slot="menubar-separator"
        {...props}
    />
);

export default MenubarSeparator;
