"use client";

import { Sub } from "@radix-ui/react-context-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const ContextMenuSub = ({ ...props }: ComponentPropsWithoutRef<typeof Sub>) => (
    <Sub data-slot="context-menu-sub" {...props} />
);

export default ContextMenuSub;
