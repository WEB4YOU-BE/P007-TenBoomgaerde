"use client";

import { Root } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const Sheet = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="sheet" {...props} />
);

export default Sheet;
