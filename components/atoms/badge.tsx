import { cn } from "@/utils/tailwindcss/mergeClassNames";
import badgeVariants, {
    type BadgeVariantProps,
} from "@/utils/tailwindcss/variants/badgeVariants";
import { Slot } from "@radix-ui/react-slot";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

interface BadgeProps
    extends BadgeVariantProps,
        ComponentPropsWithoutRef<"span"> {
    asChild?: boolean;
}

const Badge: FC<BadgeProps> = ({
    asChild = false,
    className,
    variant,
    ...props
}) => {
    const Comp = asChild ? Slot : "span";

    return (
        <Comp
            className={cn(badgeVariants({ variant }), className)}
            data-slot="badge"
            {...props}
        />
    );
};

export default Badge;
