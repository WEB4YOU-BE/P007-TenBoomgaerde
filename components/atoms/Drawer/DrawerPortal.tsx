"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const DrawerPortal = ({
    ...props
}: ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>) => (
    <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
);

export default DrawerPortal;
