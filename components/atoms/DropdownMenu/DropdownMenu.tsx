"use client";

import { Root } from "@radix-ui/react-dropdown-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const DropdownMenu = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="dropdown-menu" {...props} />
);

export default DropdownMenu;
