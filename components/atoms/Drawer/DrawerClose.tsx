"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const DrawerClose = ({
    ...props
}: ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>) => (
    <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
);

export default DrawerClose;
