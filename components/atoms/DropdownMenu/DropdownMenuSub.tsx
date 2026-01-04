"use client";

import { Sub } from "@radix-ui/react-dropdown-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const DropdownMenuSub = ({
    ...props
}: ComponentPropsWithoutRef<typeof Sub>) => (
    <Sub data-slot="dropdown-menu-sub" {...props} />
);

export default DropdownMenuSub;
