"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Tabs = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Root>) => (
    <TabsPrimitive.Root
        className={cn("flex flex-col gap-2", className)}
        data-slot="tabs"
        {...props}
    />
);

const TabsContent = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) => (
    <TabsPrimitive.Content
        className={cn(
            "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 flex-1 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
            className
        )}
        data-slot="tabs-content"
        {...props}
    />
);

const TabsList = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
    <TabsPrimitive.List
        className={cn(
            "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-1",
            className
        )}
        data-slot="tabs-list"
        {...props}
    />
);

const TabsTrigger = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
    <TabsPrimitive.Trigger
        className={cn(
            "data-[state=active]:bg-background data-[state=active]:text-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 inline-flex items-center justify-center gap-2 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 aria-invalid:focus-visible:ring-0 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
        )}
        data-slot="tabs-trigger"
        {...props}
    />
);

export { Tabs, TabsContent, TabsList, TabsTrigger };
