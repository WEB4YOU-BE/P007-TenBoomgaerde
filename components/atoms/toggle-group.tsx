"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import React, {
    ComponentPropsWithoutRef,
    createContext,
    useContext,
} from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import toggleVariants, {
    ToggleVariantProps,
} from "@/utils/tailwindcss/variants/toggleVariants";

const ToggleGroupContext = createContext<ToggleVariantProps>({
    size: "default",
    variant: "default",
});

const ToggleGroup = ({
    children,
    className,
    size,
    variant,
    ...props
}: ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    ToggleVariantProps) => {
    return (
        <ToggleGroupPrimitive.Root
            className={cn(
                "group/toggle-group flex items-center justify-center rounded-md data-[variant=outline]:shadow-xs",
                className
            )}
            data-size={size}
            data-slot="toggle-group"
            data-variant={variant}
            {...props}
        >
            <ToggleGroupContext.Provider value={{ size, variant }}>
                {children}
            </ToggleGroupContext.Provider>
        </ToggleGroupPrimitive.Root>
    );
};

const ToggleGroupItem = ({
    children,
    className,
    size,
    variant,
    ...props
}: ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    ToggleVariantProps) => {
    const context = useContext(ToggleGroupContext);

    return (
        <ToggleGroupPrimitive.Item
            className={cn(
                toggleVariants({
                    size: context.size || size,
                    variant: context.variant || variant,
                }),
                "min-w-0 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
                className
            )}
            data-size={context.size || size}
            data-slot="toggle-group-item"
            data-variant={context.variant || variant}
            {...props}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
};

export { ToggleGroup, ToggleGroupItem };
