import { Item } from "@radix-ui/react-navigation-menu";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const NavigationMenuItem: FC<ComponentPropsWithoutRef<typeof Item>> = ({
    className,
    ...props
}) => (
    <Item
        className={cn("relative", className)}
        data-slot="navigation-menu-item"
        {...props}
    />
);

export default NavigationMenuItem;
