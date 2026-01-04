"use client";

import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const DropdownMenuRadioGroup = ({
    ...props
}: ComponentPropsWithoutRef<typeof RadioGroup>) => (
    <RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
);

export default DropdownMenuRadioGroup;
