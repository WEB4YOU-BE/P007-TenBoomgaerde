"use client";

import { Group } from "@radix-ui/react-dropdown-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const DropdownMenuGroup = ({
    ...props
}: ComponentPropsWithoutRef<typeof Group>) => (
    <Group data-slot="dropdown-menu-group" {...props} />
);

export default DropdownMenuGroup;
