import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const PaginationContent = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"ul">) => (
    <ul
        className={cn("flex flex-row items-center gap-1", className)}
        data-slot="pagination-content"
        {...props}
    />
);

export default PaginationContent;
