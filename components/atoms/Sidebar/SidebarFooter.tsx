import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarFooter = ({
    className,
    ...props
}: ComponentPropsWithRef<"div">) => (
    <div
        className={cn("flex flex-col gap-2 p-2", className)}
        data-sidebar="footer"
        data-slot="sidebar-footer"
        {...props}
    />
);

export default SidebarFooter;
