"use client";

import { Trigger } from "@radix-ui/react-tabs";
import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TabsTrigger = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Trigger
        className={cn(
            "data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:outline-ring inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4",
            className
        )}
        data-slot="tabs-trigger"
        {...props}
    />
);

export default TabsTrigger;
