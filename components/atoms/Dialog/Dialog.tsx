"use client";

import { Root } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const Dialog = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="dialog" {...props} />
);

export default Dialog;
