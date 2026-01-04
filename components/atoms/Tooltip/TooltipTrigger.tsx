"use client";

import { Trigger } from "@radix-ui/react-tooltip";
import { type ComponentPropsWithoutRef } from "react";

const TooltipTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => {
    return <Trigger data-slot="tooltip-trigger" {...props} />;
};

export default TooltipTrigger;
