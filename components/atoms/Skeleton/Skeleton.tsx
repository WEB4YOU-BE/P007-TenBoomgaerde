import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Skeleton = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
    <div
        className={cn("bg-primary/10 animate-pulse rounded-md", className)}
        data-slot="skeleton"
        {...props}
    />
);

export default Skeleton;
