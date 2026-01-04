"use client";

import { Trigger } from "@radix-ui/react-dropdown-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const DropdownMenuTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Trigger data-slot="dropdown-menu-trigger" {...props} />
);

export default DropdownMenuTrigger;
