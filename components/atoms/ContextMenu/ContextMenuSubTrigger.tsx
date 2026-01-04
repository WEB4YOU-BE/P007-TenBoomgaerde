"use client";

import { CaretRightIcon } from "@phosphor-icons/react/ssr";
import { SubTrigger } from "@radix-ui/react-context-menu";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const ContextMenuSubTrigger = ({
    children,
    className,
    inset,
    ...props
}: ComponentPropsWithoutRef<typeof SubTrigger> & { inset?: boolean }) => (
    <SubTrigger
        className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
        )}
        data-inset={inset}
        data-slot="context-menu-sub-trigger"
        {...props}
    >
        {children}
        <CaretRightIcon className="ml-auto" />
    </SubTrigger>
);

export default ContextMenuSubTrigger;
