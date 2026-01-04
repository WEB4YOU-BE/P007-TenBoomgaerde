"use client";

import { Anchor } from "@radix-ui/react-popover";
import React, { type ComponentPropsWithoutRef } from "react";

const PopoverAnchor = ({
    ...props
}: ComponentPropsWithoutRef<typeof Anchor>) => (
    <Anchor data-slot="popover-anchor" {...props} />
);

export default PopoverAnchor;
