"use client";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import React, { ComponentPropsWithoutRef } from "react";

const toggleVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 transition-[color,box-shadow]",
    {
        defaultVariants: { size: "default", variant: "default" },
        variants: {
            size: {
                default: "h-9 px-2 min-w-9",
                lg: "h-10 px-2.5 min-w-10",
                sm: "h-8 px-1.5 min-w-8",
            },
            variant: {
                default: "bg-transparent",
                outline:
                    "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
            },
        },
    }
);

const Toggle = ({
    className,
    size,
    variant,
    ...props
}: ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>) => {
    return (
        <TogglePrimitive.Root
            className={cn(toggleVariants({ className, size, variant }))}
            data-slot="toggle"
            {...props}
        />
    );
};

export { Toggle, toggleVariants };
