import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import React, { type ComponentPropsWithoutRef } from "react";

const Breadcrumb = ({ ...props }: ComponentPropsWithoutRef<"nav">) => {
    return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
};

const BreadcrumbEllipsis = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"span">) => {
    return (
        <span
            aria-hidden="true"
            className={cn("flex size-9 items-center justify-center", className)}
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            {...props}
        >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">More</span>
        </span>
    );
};

const BreadcrumbItem = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"li">) => {
    return (
        <li
            className={cn("inline-flex items-center gap-1.5", className)}
            data-slot="breadcrumb-item"
            {...props}
        />
    );
};

const BreadcrumbLink = ({
    asChild,
    className,
    ...props
}: ComponentPropsWithoutRef<"a"> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            className={cn("hover:text-foreground transition-colors", className)}
            data-slot="breadcrumb-link"
            {...props}
        />
    );
};

const BreadcrumbList = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"ol">) => {
    return (
        <ol
            className={cn(
                "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
                className
            )}
            data-slot="breadcrumb-list"
            {...props}
        />
    );
};

const BreadcrumbPage = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"span">) => {
    return (
        <span
            aria-current="page"
            aria-disabled="true"
            className={cn("text-foreground font-normal", className)}
            data-slot="breadcrumb-page"
            role="link"
            {...props}
        />
    );
};

const BreadcrumbSeparator = ({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"li">) => {
    return (
        <li
            aria-hidden="true"
            className={cn("[&>svg]:size-3.5", className)}
            data-slot="breadcrumb-separator"
            role="presentation"
            {...props}
        >
            {children ?? <ChevronRight />}
        </li>
    );
};

export {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
};
