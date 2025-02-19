import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { ComponentPropsWithoutRef, FC } from "react";

const Skeleton: FC<ComponentPropsWithoutRef<"div">> = ({
    className,
    ...props
}) => {
    return (
        <div
            className={cn("bg-primary/10 animate-pulse rounded-md", className)}
            data-slot="skeleton"
            {...props}
        />
    );
};

export { Skeleton };
