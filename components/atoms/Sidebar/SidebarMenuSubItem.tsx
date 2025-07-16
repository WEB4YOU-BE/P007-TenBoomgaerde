import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarMenuSubItem = ({
    className,
    ...props
}: ComponentPropsWithRef<"li">) => (
    <li
        className={cn("group/menu-sub-item relative", className)}
        data-sidebar="menu-sub-item"
        data-slot="sidebar-menu-sub-item"
        {...props}
    />
);

export default SidebarMenuSubItem;
