import { CaretRightIcon } from "@phosphor-icons/react/ssr";
import React, { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

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
        {children ?? <CaretRightIcon />}
    </li>
);

export default BreadcrumbSeparator;
