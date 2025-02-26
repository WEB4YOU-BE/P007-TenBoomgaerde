import Button from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";
import {
    CaretLeft,
    CaretRight,
    DotsThree,
} from "@phosphor-icons/react/dist/ssr";
import React, { ComponentPropsWithoutRef } from "react";

type PaginationLinkProps = ComponentPropsWithoutRef<"a"> &
    Pick<ComponentPropsWithoutRef<typeof Button>, "size"> & {
        isActive?: boolean;
    };

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
        <DotsThree className="size-4" />
        <span className="sr-only">More pages</span>
    </span>
);

const PaginationItem = ({ ...props }: ComponentPropsWithoutRef<"li">) => (
    <li data-slot="pagination-item" {...props} />
);

const PaginationLink = ({
    className,
    isActive,
    size = "icon",
    ...props
}: PaginationLinkProps) => (
    <a
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonVariants({
                size,
                variant: isActive ? "outline" : "ghost",
            }),
            className
        )}
        data-active={isActive}
        data-slot="pagination-link"
        {...props}
    />
);

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
        <CaretRight />
    </PaginationLink>
);

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
        <CaretLeft />
        <span className="hidden sm:block">Previous</span>
    </PaginationLink>
);

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
