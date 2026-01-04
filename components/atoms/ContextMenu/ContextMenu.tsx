"use client";

import { Root } from "@radix-ui/react-context-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const ContextMenu = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="context-menu" {...props} />
);

export default ContextMenu;
