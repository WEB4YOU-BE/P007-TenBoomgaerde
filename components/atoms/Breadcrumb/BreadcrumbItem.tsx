import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { ComponentPropsWithoutRef } from "react";

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
