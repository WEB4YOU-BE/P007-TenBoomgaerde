"use client";

import { Sub } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

const MenubarSub = ({ ...props }: ComponentPropsWithoutRef<typeof Sub>) => (
    <Sub data-slot="menubar-sub" {...props} />
);

export default MenubarSub;
