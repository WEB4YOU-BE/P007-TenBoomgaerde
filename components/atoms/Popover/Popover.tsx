"use client";

import { Root } from "@radix-ui/react-popover";
import React, { type ComponentPropsWithoutRef } from "react";

const Popover = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="popover" {...props} />
);

export default Popover;
