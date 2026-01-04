"use client";

import { Root } from "@radix-ui/react-select";
import React, { type ComponentPropsWithoutRef } from "react";

const Select = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="select" {...props} />
);

export default Select;
