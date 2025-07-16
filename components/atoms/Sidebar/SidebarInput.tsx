import React, { type ComponentPropsWithRef } from "react";

import { Input } from "@/components/atoms/input";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarInput = ({
    className,
    ...props
}: ComponentPropsWithRef<typeof Input>) => (
    <Input
        className={cn("bg-background h-8 w-full shadow-none", className)}
        data-sidebar="input"
        data-slot="sidebar-input"
        {...props}
    />
);

export default SidebarInput;
