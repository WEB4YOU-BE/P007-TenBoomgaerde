import { Description } from "@radix-ui/react-alert-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

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
