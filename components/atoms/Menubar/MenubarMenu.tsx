"use client";

import { Menu } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

const MenubarMenu = ({ ...props }: ComponentPropsWithoutRef<typeof Menu>) => (
    <Menu data-slot="menubar-menu" {...props} />
);

export default MenubarMenu;
