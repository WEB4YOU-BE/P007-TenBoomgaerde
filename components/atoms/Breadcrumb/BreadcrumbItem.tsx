import React, { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const BreadcrumbItem = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"li">) => (
    <li
        className={cn("inline-flex items-center gap-1.5", className)}
        data-slot="breadcrumb-item"
        {...props}
    />
);

export default BreadcrumbItem;
