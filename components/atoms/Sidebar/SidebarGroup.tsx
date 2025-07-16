import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarGroup = ({
    className,
    ...props
}: ComponentPropsWithRef<"div">) => (
    <div
        className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
        data-sidebar="group"
        data-slot="sidebar-group"
        {...props}
    />
);

export default SidebarGroup;
