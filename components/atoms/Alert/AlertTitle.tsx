import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { type ComponentPropsWithoutRef } from "react";

const AlertTitle = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => {
    return (
        <div
            className={cn(
                "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
                className
            )}
            data-slot="alert-title"
            {...props}
        />
    );
};

export default AlertTitle;
