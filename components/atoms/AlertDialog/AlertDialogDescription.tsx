import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { Description } from "@radix-ui/react-alert-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const AlertDialogDescription = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Description>) => (
    <Description
        className={cn("text-muted-foreground text-sm", className)}
        data-slot="alert-dialog-description"
        {...props}
    />
);

export default AlertDialogDescription;
