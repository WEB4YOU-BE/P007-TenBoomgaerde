"use client";

import { TooltipProvider } from "@/components/atoms/tooltip";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React from "react";
import { forwardRef, type HTMLAttributes } from "react";

const Sidebar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => {
        return (
            <TooltipProvider>
                <aside
                    className={cn(
                        className,
                        "sticky top-0 h-[100dvh] p-2 max-md:hidden"
                    )}
                    ref={ref}
                    {...props}
                >
                    <div className="flex h-full flex-col gap-2 overflow-y-auto rounded-lg border border-muted p-2">
                        {children}
                    </div>
                </aside>
            </TooltipProvider>
        );
    }
);
Sidebar.displayName = "Sidebar";

export { Sidebar };
export default Sidebar;
