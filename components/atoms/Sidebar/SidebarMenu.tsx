import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarMenu = ({ className, ...props }: ComponentPropsWithRef<"ul">) => (
    <ul
        className={cn("flex w-full min-w-0 flex-col gap-1", className)}
        data-sidebar="menu"
        data-slot="sidebar-menu"
        {...props}
    />
);

export default SidebarMenu;
