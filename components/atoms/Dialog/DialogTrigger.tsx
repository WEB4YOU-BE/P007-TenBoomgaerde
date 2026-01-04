"use client";

import { Trigger } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const DialogTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Trigger data-slot="dialog-trigger" {...props} />
);

export default DialogTrigger;
