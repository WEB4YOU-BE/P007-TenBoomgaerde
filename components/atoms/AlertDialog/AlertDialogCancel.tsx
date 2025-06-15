import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";
import { Cancel } from "@radix-ui/react-alert-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const AlertDialogCancel = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Cancel>) => (
    <Cancel
        className={cn(buttonVariants({ variant: "outline" }), className)}
        {...props}
    />
);

export default AlertDialogCancel;
