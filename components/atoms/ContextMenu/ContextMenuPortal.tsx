"use client";

import { Portal } from "@radix-ui/react-context-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const ContextMenuPortal = ({
    ...props
}: ComponentPropsWithoutRef<typeof Portal>) => (
    <Portal data-slot="context-menu-portal" {...props} />
);

export default ContextMenuPortal;
