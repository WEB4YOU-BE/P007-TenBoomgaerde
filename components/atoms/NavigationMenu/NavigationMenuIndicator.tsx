import { Indicator } from "@radix-ui/react-navigation-menu";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const NavigationMenuIndicator: FC<
    ComponentPropsWithoutRef<typeof Indicator>
> = ({ className, ...props }) => (
    <Indicator
        className={cn(
            "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
            className
        )}
        data-slot="navigation-menu-indicator"
        {...props}
    >
        <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </Indicator>
);

export default NavigationMenuIndicator;
