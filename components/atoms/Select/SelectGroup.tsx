"use client";

import { Group } from "@radix-ui/react-select";
import React, { type ComponentPropsWithoutRef } from "react";

const SelectGroup = ({ ...props }: ComponentPropsWithoutRef<typeof Group>) => (
    <Group data-slot="select-group" {...props} />
);

export default SelectGroup;
