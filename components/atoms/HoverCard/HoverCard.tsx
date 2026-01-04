"use client";

import { Root } from "@radix-ui/react-hover-card";
import React, { type ComponentPropsWithoutRef } from "react";

const HoverCard = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="hover-card" {...props} />
);

export default HoverCard;
