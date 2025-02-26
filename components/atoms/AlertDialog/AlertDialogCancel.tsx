import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
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
