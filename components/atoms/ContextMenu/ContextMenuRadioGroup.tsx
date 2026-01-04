"use client";

import { RadioGroup } from "@radix-ui/react-context-menu";
import React, { type ComponentPropsWithoutRef } from "react";

const ContextMenuRadioGroup = ({
    ...props
}: ComponentPropsWithoutRef<typeof RadioGroup>) => (
    <RadioGroup data-slot="context-menu-radio-group" {...props} />
);

export default ContextMenuRadioGroup;
