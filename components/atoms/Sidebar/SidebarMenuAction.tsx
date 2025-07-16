import { Slot } from "@radix-ui/react-slot";
import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface SidebarMenuActionProps extends ComponentPropsWithRef<"button"> {
    asChild?: boolean;
    showOnHover?: boolean;
}
const SidebarMenuAction = ({
    asChild = false,
    className,
    showOnHover = false,
    ...props
}: SidebarMenuActionProps) => {
    const Component = asChild ? Slot : "button";

    return (
        <Component
            className={cn(
                "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                // Increases the hit area of the button on mobile.
                "after:absolute after:-inset-2 md:after:hidden",
                "peer-data-[size=sm]/menu-button:top-1",
                "peer-data-[size=default]/menu-button:top-1.5",
                "peer-data-[size=lg]/menu-button:top-2.5",
                "group-data-[collapsible=icon]:hidden",
                showOnHover &&
                    "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
                className
            )}
            data-sidebar="menu-action"
            data-slot="sidebar-menu-action"
            {...props}
        />
    );
};

export default SidebarMenuAction;
