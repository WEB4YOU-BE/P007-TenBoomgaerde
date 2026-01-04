"use client";

import { Item } from "@radix-ui/react-toggle-group";
import { type ComponentPropsWithoutRef, useContext } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import toggleVariants, {
    type ToggleVariantProps,
} from "@/utils/tailwindcss/variants/toggleVariants";

import ToggleGroupContext from "./ToggleGroupContext";

const ToggleGroupItem = ({
    children,
    className,
    size,
    variant,
    ...props
}: ComponentPropsWithoutRef<typeof Item> & ToggleVariantProps) => {
    const context = useContext(ToggleGroupContext);

    return (
        <Item
            className={cn(
                toggleVariants({
                    size: context.size ?? size,
                    variant: context.variant ?? variant,
                }),
                "min-w-0 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
                className
            )}
            data-size={context.size ?? size}
            data-slot="toggle-group-item"
            data-variant={context.variant ?? variant}
            {...props}
        >
            {children}
        </Item>
    );
};

export default ToggleGroupItem;
