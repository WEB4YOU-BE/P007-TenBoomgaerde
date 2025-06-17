import { DotsThree } from "@phosphor-icons/react/dist/ssr";
import React, { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const BreadcrumbEllipsis = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"span">) => (
    <span
        aria-hidden="true"
        className={cn("flex size-9 items-center justify-center", className)}
        data-slot="breadcrumb-ellipsis"
        role="presentation"
        {...props}
    >
        <DotsThree className="size-4" />
        <span className="sr-only">More</span>
    </span>
);

export default BreadcrumbEllipsis;
