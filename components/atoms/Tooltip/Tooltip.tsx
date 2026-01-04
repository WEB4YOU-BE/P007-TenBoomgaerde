"use client";

import { Root } from "@radix-ui/react-tooltip";
import { type ComponentPropsWithoutRef } from "react";

import TooltipProvider from "./TooltipProvider";

const Tooltip = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => {
    return (
        <TooltipProvider>
            <Root data-slot="tooltip" {...props} />
        </TooltipProvider>
    );
};

export default Tooltip;
