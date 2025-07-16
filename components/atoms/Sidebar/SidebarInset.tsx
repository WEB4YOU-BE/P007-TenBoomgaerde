import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarInset = ({
    className,
    ...props
}: ComponentPropsWithRef<"main">) => (
    <main
        className={cn(
            "bg-background relative flex min-w-0 w-full flex-1 flex-col",
            "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
            className
        )}
        data-slot="sidebar-inset"
        {...props}
    />
);

export default SidebarInset;
