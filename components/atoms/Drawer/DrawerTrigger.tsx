"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const DrawerTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>) => (
    <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
);

export default DrawerTrigger;
