import { Link } from "@radix-ui/react-navigation-menu";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const NavigationMenuLink: FC<ComponentPropsWithoutRef<typeof Link>> = ({
    className,
    ...props
}) => (
    <Link
        className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
            className
        )}
        data-slot="navigation-menu-link"
        {...props}
    />
);

export default NavigationMenuLink;
