import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { type ComponentPropsWithoutRef } from "react";

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
