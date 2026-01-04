"use client";

import { Root } from "@radix-ui/react-collapsible";
import React, { type ComponentPropsWithoutRef } from "react";

const Collapsible = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="collapsible" {...props} />
);

export default Collapsible;
