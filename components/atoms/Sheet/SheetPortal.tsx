"use client";

import { Portal } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const SheetPortal = ({ ...props }: ComponentPropsWithoutRef<typeof Portal>) => (
    <Portal data-slot="sheet-portal" {...props} />
);

export default SheetPortal;
