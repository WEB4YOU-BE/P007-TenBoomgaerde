import { Slot } from "@radix-ui/react-slot";
import React, { type ComponentPropsWithRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants, {
    type ButtonVariantProps,
} from "@/utils/tailwindcss/variants/buttonVariants";

interface ButtonProps
    extends ButtonVariantProps,
        ComponentPropsWithRef<"button"> {
    asChild?: boolean;
}

const Button: FC<ButtonProps> = ({
    asChild = false,
    className,
    size,
    variant,
    ...props
}) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn(buttonVariants({ className, size, variant }))}
            data-slot="button"
            {...props}
        />
    );
};

export default Button;
