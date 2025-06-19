import { Title } from "@radix-ui/react-alert-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const AlertDialogTitle = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Title>) => (
    <Title
        className={cn("text-lg font-semibold", className)}
        data-slot="alert-dialog-title"
        {...props}
    />
);

export default AlertDialogTitle;
