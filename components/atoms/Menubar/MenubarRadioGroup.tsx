"use client";

import { RadioGroup } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

const MenubarRadioGroup = ({
    ...props
}: ComponentPropsWithoutRef<typeof RadioGroup>) => (
    <RadioGroup data-slot="menubar-radio-group" {...props} />
);

export default MenubarRadioGroup;
