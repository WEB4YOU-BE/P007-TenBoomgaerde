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

export default Alert;
