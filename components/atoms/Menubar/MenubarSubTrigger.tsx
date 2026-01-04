"use client";

import { CaretRightIcon } from "@phosphor-icons/react/ssr";
import { SubTrigger } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const MenubarSubTrigger = ({
    children,
    className,
    inset,
    ...props
}: ComponentPropsWithoutRef<typeof SubTrigger> & { inset?: boolean }) => (
    <SubTrigger
        className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
            className
        )}
        data-inset={inset}
        data-slot="menubar-sub-trigger"
        {...props}
    >
        {children}
        <CaretRightIcon className="ml-auto size-4" />
    </SubTrigger>
);

export default MenubarSubTrigger;
