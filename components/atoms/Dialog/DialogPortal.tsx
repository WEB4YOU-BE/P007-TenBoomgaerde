"use client";

import { Portal } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const DialogPortal = ({
    ...props
}: ComponentPropsWithoutRef<typeof Portal>) => (
    <Portal data-slot="dialog-portal" {...props} />
);

export default DialogPortal;
