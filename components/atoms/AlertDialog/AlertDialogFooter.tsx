import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const AlertDialogFooter = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => (
    <div
        className={cn(
            "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
            className
        )}
        data-slot="alert-dialog-footer"
        {...props}
    />
);

export default AlertDialogFooter;
