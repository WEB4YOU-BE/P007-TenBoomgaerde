import { CaretLeftIcon } from "@phosphor-icons/react/ssr";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

import PaginationLink from "./PaginationLink";

const PaginationPrevious = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
        size="default"
        {...props}
    >
        <CaretLeftIcon />
        <span className="hidden sm:block">Previous</span>
    </PaginationLink>
);

export default PaginationPrevious;
