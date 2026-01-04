"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const DropdownMenuSeparator = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Separator>) => (
    <Separator
        className={cn("bg-border -mx-1 my-1 h-px", className)}
        data-slot="dropdown-menu-separator"
        {...props}
    />
);

export default DropdownMenuSeparator;
