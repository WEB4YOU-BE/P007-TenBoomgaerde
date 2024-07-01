"use client";

import { TooltipProvider } from "@/components/atoms/tooltip";
import { cn } from "@/utils/tailwindcss/MergeCN";
import { forwardRef, type HTMLAttributes } from "react";

const Sidebar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <TooltipProvider>
        <aside
          ref={ref}
          className={cn(className, "h-[100dvh] p-2 max-md:hidden sticky top-0")}
          {...props}
        >
          <div className="flex h-full flex-col gap-2 rounded-lg border border-muted p-2">
            {children}
          </div>
        </aside>
      </TooltipProvider>
    );
  },
);
Sidebar.displayName = "Sidebar";

export { Sidebar };
export default Sidebar;
