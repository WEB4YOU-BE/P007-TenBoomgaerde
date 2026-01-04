import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import Separator from "@/components/atoms/Separator";

const SidebarSeparator = ({
    className,
    ...props
}: ComponentPropsWithRef<typeof Separator>) => (
    <Separator
        className={cn("bg-sidebar-border mx-2 w-auto", className)}
        data-sidebar="separator"
        data-slot="sidebar-separator"
        {...props}
    />
);

export default SidebarSeparator;
