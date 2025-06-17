import { Cancel } from "@radix-ui/react-alert-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

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
