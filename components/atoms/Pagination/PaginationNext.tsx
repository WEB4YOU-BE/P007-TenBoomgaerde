import { CaretRightIcon } from "@phosphor-icons/react/ssr";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

import PaginationLink from "./PaginationLink";

const PaginationNext = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
        size="default"
        {...props}
    >
        <span className="hidden sm:block">Next</span>
        <CaretRightIcon />
    </PaginationLink>
);

export default PaginationNext;
