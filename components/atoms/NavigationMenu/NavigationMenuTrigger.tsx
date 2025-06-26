import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { Trigger } from "@radix-ui/react-navigation-menu";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import navigationMenuTriggerVariants from "@/utils/tailwindcss/variants/navigationMenuTriggerVariants";

const NavigationMenuTrigger: FC<ComponentPropsWithoutRef<typeof Trigger>> = ({
    children,
    className,
    ...props
}) => (
    <Trigger
        className={cn(navigationMenuTriggerVariants(), "group", className)}
        data-slot="navigation-menu-trigger"
        {...props}
    >
        {children}{" "}
        <CaretDownIcon
            aria-hidden="true"
            className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        />
    </Trigger>
);

export default NavigationMenuTrigger;
