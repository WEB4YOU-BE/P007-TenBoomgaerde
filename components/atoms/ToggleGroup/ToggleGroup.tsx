"use client";

import { Root } from "@radix-ui/react-toggle-group";
import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { type ToggleVariantProps } from "@/utils/tailwindcss/variants/toggleVariants";

import ToggleGroupContext from "./ToggleGroupContext";

const ToggleGroup = ({
    children,
    className,
    size,
    variant,
    ...props
}: ComponentPropsWithoutRef<typeof Root> & ToggleVariantProps) => {
    return (
        <Root
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
        </Root>
    );
};

export default ToggleGroup;
