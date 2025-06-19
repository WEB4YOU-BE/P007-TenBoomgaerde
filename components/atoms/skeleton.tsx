import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Skeleton: FC<ComponentPropsWithoutRef<"div">> = ({
    className,
    ...props
}) => (
    <div
        className={cn("bg-primary/10 animate-pulse rounded-md", className)}
        data-slot="skeleton"
        {...props}
    />
);

export default Skeleton;
