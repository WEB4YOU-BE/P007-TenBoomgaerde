import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const AlertDialogHeader = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => (
    <div
        className={cn(
            "flex flex-col gap-2 text-center sm:text-left",
            className
        )}
        data-slot="alert-dialog-header"
        {...props}
    />
);

export default AlertDialogHeader;
