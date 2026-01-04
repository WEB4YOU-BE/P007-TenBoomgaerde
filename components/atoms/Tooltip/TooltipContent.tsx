"use client";

import { Arrow, Content, Portal } from "@radix-ui/react-tooltip";
import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TooltipContent = ({
    children,
    className,
    sideOffset = 4,
    ...props
}: ComponentPropsWithoutRef<typeof Content>) => {
    return (
        <Portal>
            <Content
                className={cn(
                    "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-w-sm rounded-md px-3 py-1.5 text-xs",
                    className
                )}
                data-slot="tooltip-content"
                sideOffset={sideOffset}
                {...props}
            >
                {children}
                <Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
            </Content>
        </Portal>
    );
};

export default TooltipContent;
