import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarContent = ({
    className,
    ...props
}: ComponentPropsWithRef<"div">) => (
    <div
        className={cn(
            "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
            className
        )}
        data-sidebar="content"
        data-slot="sidebar-content"
        {...props}
    />
);

export default SidebarContent;
