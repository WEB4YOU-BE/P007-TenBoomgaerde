import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { Title } from "@radix-ui/react-alert-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

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
