"use client";

import { Group } from "@radix-ui/react-context-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const ContextMenuGroup = ({
    ...props
}: ComponentPropsWithoutRef<typeof Group>) => (
    <Group data-slot="context-menu-group" {...props} />
);

export default ContextMenuGroup;
