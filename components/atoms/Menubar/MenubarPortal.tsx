"use client";

import { Portal } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

const MenubarPortal = ({
    ...props
}: ComponentPropsWithoutRef<typeof Portal>) => (
    <Portal data-slot="menubar-portal" {...props} />
);

export default MenubarPortal;
