import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Pagination = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"nav">) => (
    <nav
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        data-slot="pagination"
        role="navigation"
        {...props}
    />
);

export default Pagination;
