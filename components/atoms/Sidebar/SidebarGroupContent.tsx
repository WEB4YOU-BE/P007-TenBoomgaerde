import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarGroupContent = ({
    className,
    ...props
}: ComponentPropsWithRef<"div">) => (
    <div
        className={cn("w-full text-sm", className)}
        data-sidebar="group-content"
        data-slot="sidebar-group-content"
        {...props}
    />
);

export default SidebarGroupContent;
