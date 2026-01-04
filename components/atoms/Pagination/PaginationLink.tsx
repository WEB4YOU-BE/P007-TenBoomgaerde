import React, { type ComponentPropsWithoutRef } from "react";

import Button from "@/components/atoms/Button";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

type PaginationLinkProps = ComponentPropsWithoutRef<"a"> &
    Pick<ComponentPropsWithoutRef<typeof Button>, "size"> & {
        isActive?: boolean;
    };

const PaginationLink = ({
    className,
    isActive,
    size = "icon",
    ...props
}: PaginationLinkProps) => (
    <a
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonVariants({ size, variant: isActive ? "outline" : "ghost" }),
            className
        )}
        data-active={isActive}
        data-slot="pagination-link"
        {...props}
    />
);

export default PaginationLink;
