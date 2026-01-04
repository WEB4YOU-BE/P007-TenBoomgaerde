"use client";

import { Root } from "@radix-ui/react-toggle";
import { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import toggleVariants, {
    type ToggleVariantProps,
} from "@/utils/tailwindcss/variants/toggleVariants";

type ToggleProps = ComponentPropsWithoutRef<typeof Root> & ToggleVariantProps;

const Toggle: FC<ToggleProps> = ({ className, size, variant, ...props }) => (
    <Root
        className={cn(toggleVariants({ className, size, variant }))}
        data-slot="toggle"
        {...props}
    />
);

export default Toggle;
