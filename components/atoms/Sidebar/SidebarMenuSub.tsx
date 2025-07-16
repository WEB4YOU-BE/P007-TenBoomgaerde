import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarMenuSub = ({
    className,
    ...props
}: ComponentPropsWithRef<"ul">) => (
    <ul
        className={cn(
            "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
            "group-data-[collapsible=icon]:hidden",
            className
        )}
        data-sidebar="menu-sub"
        data-slot="sidebar-menu-sub"
        {...props}
    />
);

export default SidebarMenuSub;
