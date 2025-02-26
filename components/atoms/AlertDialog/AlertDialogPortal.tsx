import { Portal } from "@radix-ui/react-alert-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const AlertDialogPortal = ({
    ...props
}: ComponentPropsWithoutRef<typeof Portal>) => (
    <Portal data-slot="alert-dialog-portal" {...props} />
);

export default AlertDialogPortal;
