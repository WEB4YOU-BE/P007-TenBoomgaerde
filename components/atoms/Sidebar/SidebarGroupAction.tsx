import { Slot } from "@radix-ui/react-slot";
import React, { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface SidebarGroupActionProps extends ComponentPropsWithRef<"button"> {
    asChild?: boolean;
}
const SidebarGroupAction = ({
    asChild = false,
    className,
    ...props
}: SidebarGroupActionProps) => {
    const Component = asChild ? Slot : "button";

    return (
        <Component
            className={cn(
                "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                // Increases the hit area of the button on mobile.
                "after:absolute after:-inset-2 md:after:hidden",
                "group-data-[collapsible=icon]:hidden",
                className
            )}
            data-sidebar="group-action"
            data-slot="sidebar-group-action"
            {...props}
        />
    );
};

export default SidebarGroupAction;
