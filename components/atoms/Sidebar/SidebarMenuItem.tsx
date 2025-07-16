import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarMenuItem = ({
    className,
    ...props
}: ComponentPropsWithRef<"li">) => (
    <li
        className={cn("group/menu-item relative", className)}
        data-sidebar="menu-item"
        data-slot="sidebar-menu-item"
        {...props}
    />
);

export default SidebarMenuItem;
