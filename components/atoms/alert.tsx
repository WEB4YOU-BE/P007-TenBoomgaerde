import { cn } from "@/utils/tailwindcss/mergeClassNames";
import alertVariants, {
    type AlertVariantProps,
} from "@/utils/tailwindcss/variants/alertVariants";
import React, { type ComponentPropsWithoutRef } from "react";

const Alert = ({
    className,
    variant,
    ...props
}: AlertVariantProps & ComponentPropsWithoutRef<"div">) => {
    return (
        <div
            className={cn(alertVariants({ variant }), className)}
            data-slot="alert"
            role="alert"
            {...props}
        />
    );
};

const AlertDescription = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => {
    return (
        <div
            className={cn(
                "col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
                className
            )}
            data-slot="alert-description"
            {...props}
        />
    );
};

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

export { Alert, AlertDescription, AlertTitle };
