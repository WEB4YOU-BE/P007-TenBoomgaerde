import { Root } from "@radix-ui/react-navigation-menu";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { NavigationMenuViewport } from "@/components/atoms/NavigationMenu";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface NavigationMenuProps extends ComponentPropsWithoutRef<typeof Root> {
    viewport?: boolean;
}
const NavigationMenu: FC<NavigationMenuProps> = ({
    children,
    className,
    viewport = true,
    ...props
}) => (
    <Root
        className={cn(
            "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
            className
        )}
        data-slot="navigation-menu"
        data-viewport={viewport}
        {...props}
    >
        {children}
        {viewport && <NavigationMenuViewport />}
    </Root>
);

export default NavigationMenu;
