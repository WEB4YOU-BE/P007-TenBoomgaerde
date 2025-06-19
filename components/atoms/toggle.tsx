"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import toggleVariants, {
    type ToggleVariantProps,
} from "@/utils/tailwindcss/variants/toggleVariants";

type ToggleProps = ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    ToggleVariantProps;

const Toggle: FC<ToggleProps> = ({ className, size, variant, ...props }) => (
    <TogglePrimitive.Root
        className={cn(toggleVariants({ className, size, variant }))}
        data-slot="toggle"
        {...props}
    />
);

export default Toggle;
