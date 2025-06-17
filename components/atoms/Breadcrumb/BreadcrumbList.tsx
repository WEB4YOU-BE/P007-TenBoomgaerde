import React, { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const BreadcrumbList = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"ol">) => (
    <ol
        className={cn(
            "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
            className
        )}
        data-slot="breadcrumb-list"
        {...props}
    />
);

export default BreadcrumbList;
