import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarHeader = ({
    className,
    ...props
}: ComponentPropsWithRef<"div">) => (
    <div
        className={cn("flex flex-col gap-2 p-2", className)}
        data-sidebar="header"
        data-slot="sidebar-header"
        {...props}
    />
);

export default SidebarHeader;
