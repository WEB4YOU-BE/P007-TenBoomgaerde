"use client";

import { CollapsibleTrigger as Trigger } from "@radix-ui/react-collapsible";
import React, { type ComponentPropsWithoutRef } from "react";

const CollapsibleTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Trigger data-slot="collapsible-trigger" {...props} />
);

export default CollapsibleTrigger;
