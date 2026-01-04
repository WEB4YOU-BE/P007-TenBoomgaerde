"use client";

import { Close } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const SheetClose = ({ ...props }: ComponentPropsWithoutRef<typeof Close>) => (
    <Close data-slot="sheet-close" {...props} />
);

export default SheetClose;
