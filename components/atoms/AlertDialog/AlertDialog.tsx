import { Root } from "@radix-ui/react-alert-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const AlertDialog = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="alert-dialog" {...props} />
);

export default AlertDialog;
