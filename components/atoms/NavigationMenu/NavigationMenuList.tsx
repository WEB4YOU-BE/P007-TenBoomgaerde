import { List } from "@radix-ui/react-navigation-menu";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const NavigationMenuList: FC<ComponentPropsWithoutRef<typeof List>> = ({
    className,
    ...props
}) => (
    <List
        className={cn(
            "group flex flex-1 list-none items-center justify-center gap-1",
            className
        )}
        data-slot="navigation-menu-list"
        {...props}
    />
);

export default NavigationMenuList;
