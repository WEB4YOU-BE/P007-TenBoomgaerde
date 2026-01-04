"use client";

import { Trigger } from "@radix-ui/react-hover-card";
import React, { type ComponentPropsWithoutRef } from "react";

const HoverCardTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Trigger data-slot="hover-card-trigger" {...props} />
);

export default HoverCardTrigger;
