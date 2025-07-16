import { Slot } from "@radix-ui/react-slot";
import React, { ComponentPropsWithoutRef } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<"a"> {
    asChild?: boolean;
}
const BreadcrumbLink = ({
    asChild,
    className,
    href = "#",
    ...props
}: BreadcrumbLinkProps) => {
    const Component = asChild ? Slot : Link;

    return (
        <Component
            className={cn("hover:text-foreground transition-colors", className)}
            data-slot="breadcrumb-link"
            href={href}
            {...props}
        />
    );
};

export default BreadcrumbLink;
