"use client";

import { Trigger } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const SheetTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Trigger data-slot="sheet-trigger" {...props} />
);

export default SheetTrigger;
