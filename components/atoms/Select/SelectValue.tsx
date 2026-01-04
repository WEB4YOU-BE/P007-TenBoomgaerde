"use client";

import { Value } from "@radix-ui/react-select";
import React, { type ComponentPropsWithoutRef } from "react";

const SelectValue = ({ ...props }: ComponentPropsWithoutRef<typeof Value>) => (
    <Value data-slot="select-value" {...props} />
);

export default SelectValue;
