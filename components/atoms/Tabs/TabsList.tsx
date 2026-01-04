"use client";

import { List } from "@radix-ui/react-tabs";
import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TabsList = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof List>) => (
    <List
        className={cn(
            "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-1",
            className
        )}
        data-slot="tabs-list"
        {...props}
    />
);

export default TabsList;
