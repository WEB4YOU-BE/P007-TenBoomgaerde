"use client";

import { Trigger } from "@radix-ui/react-context-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const ContextMenuTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Trigger data-slot="context-menu-trigger" {...props} />
);

export default ContextMenuTrigger;
