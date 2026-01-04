"use client";

import { Command as CommandPrimitive } from "cmdk";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CommandList = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.List>) => (
    <CommandPrimitive.List
        className={cn(
            "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
            className
        )}
        data-slot="command-list"
        {...props}
    />
);

export default CommandList;
