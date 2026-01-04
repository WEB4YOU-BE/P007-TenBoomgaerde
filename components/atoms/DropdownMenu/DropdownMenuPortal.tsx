"use client";

import { Portal } from "@radix-ui/react-dropdown-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const DropdownMenuPortal = ({
    ...props
}: ComponentPropsWithoutRef<typeof Portal>) => (
    <Portal data-slot="dropdown-menu-portal" {...props} />
);

export default DropdownMenuPortal;
