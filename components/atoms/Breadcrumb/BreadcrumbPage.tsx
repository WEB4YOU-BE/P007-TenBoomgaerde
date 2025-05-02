import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { ComponentPropsWithoutRef } from "react";

const BreadcrumbPage = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"span">) => (
    <span
        aria-current="page"
        aria-disabled="true"
        className={cn("text-foreground font-normal", className)}
        data-slot="breadcrumb-page"
        role="link"
        {...props}
    />
);

export default BreadcrumbPage;
