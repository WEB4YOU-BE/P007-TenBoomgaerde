import { Slot } from "@radix-ui/react-slot";
import React, { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<"a"> {
    asChild?: boolean;
}
const BreadcrumbLink = ({
    asChild,
    className,
    ...props
}: BreadcrumbLinkProps) => {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            className={cn("hover:text-foreground transition-colors", className)}
            data-slot="breadcrumb-link"
            {...props}
        />
    );
};

export default BreadcrumbLink;
