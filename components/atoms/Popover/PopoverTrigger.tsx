"use client";

import { Trigger } from "@radix-ui/react-popover";
import React, { type ComponentPropsWithoutRef } from "react";

const PopoverTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Trigger data-slot="popover-trigger" {...props} />
);

export default PopoverTrigger;
