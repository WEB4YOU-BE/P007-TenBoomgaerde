"use client";

import { Close } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const DialogClose = ({ ...props }: ComponentPropsWithoutRef<typeof Close>) => (
    <Close data-slot="dialog-close" {...props} />
);

export default DialogClose;
