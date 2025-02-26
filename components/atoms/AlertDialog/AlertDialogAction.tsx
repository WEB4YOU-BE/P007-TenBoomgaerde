import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { Action } from "@radix-ui/react-alert-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const AlertDialogAction = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Action>) => (
    <Action className={cn(buttonVariants(), className)} {...props} />
);

export default AlertDialogAction;
