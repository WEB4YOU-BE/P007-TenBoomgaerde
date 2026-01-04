"use client";

import { Group } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

const MenubarGroup = ({ ...props }: ComponentPropsWithoutRef<typeof Group>) => (
    <Group data-slot="menubar-group" {...props} />
);

export default MenubarGroup;
