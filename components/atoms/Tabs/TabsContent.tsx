"use client";

import { Content } from "@radix-ui/react-tabs";
import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TabsContent = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Content>) => (
    <Content
        className={cn("flex-1 outline-hidden", className)}
        data-slot="tabs-content"
        {...props}
    />
);

export default TabsContent;
