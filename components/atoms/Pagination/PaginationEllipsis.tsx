import { DotsThreeIcon } from "@phosphor-icons/react/ssr";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const PaginationEllipsis = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"span">) => (
    <span
        aria-hidden
        className={cn("flex size-9 items-center justify-center", className)}
        data-slot="pagination-ellipsis"
        {...props}
    >
        <DotsThreeIcon className="size-4" />
        <span className="sr-only">More pages</span>
    </span>
);

export default PaginationEllipsis;
