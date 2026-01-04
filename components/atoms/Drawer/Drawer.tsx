"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const Drawer = ({
    ...props
}: ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>) => (
    <DrawerPrimitive.Root data-slot="drawer" {...props} />
);

export default Drawer;
