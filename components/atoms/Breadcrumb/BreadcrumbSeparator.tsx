import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import React, { ComponentPropsWithoutRef } from "react";

const BreadcrumbSeparator = ({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"li">) => (
    <li
        aria-hidden="true"
        className={cn("[&>svg]:size-3.5", className)}
        data-slot="breadcrumb-separator"
        role="presentation"
        {...props}
    >
        {children ?? <CaretRight />}
    </li>
);

export default BreadcrumbSeparator;
