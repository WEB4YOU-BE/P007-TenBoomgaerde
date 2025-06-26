import { Viewport } from "@radix-ui/react-navigation-menu";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const NavigationMenuViewport: FC<ComponentPropsWithoutRef<typeof Viewport>> = ({
    className,
    ...props
}) => (
    <div
        className={cn(
            "absolute top-full left-0 isolate z-50 flex justify-center"
        )}
    >
        <Viewport
            className={cn(
                "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
                className
            )}
            data-slot="navigation-menu-viewport"
            {...props}
        />
    </div>
);

export default NavigationMenuViewport;
