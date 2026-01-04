"use client";

import { Provider } from "@radix-ui/react-tooltip";
import { type ComponentPropsWithoutRef } from "react";

const TooltipProvider = ({
    delayDuration = 0,
    ...props
}: ComponentPropsWithoutRef<typeof Provider>) => {
    return (
        <Provider
            data-slot="tooltip-provider"
            delayDuration={delayDuration}
            {...props}
        />
    );
};

export default TooltipProvider;
