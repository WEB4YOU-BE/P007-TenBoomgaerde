import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { forwardRef, HTMLAttributes } from "react";
import React from "react";

interface MobileHeaderProps extends HTMLAttributes<HTMLDivElement> {
    items: NavigationItem[];
}
const MobileHeader = forwardRef<HTMLDivElement, MobileHeaderProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className={cn("", className)} ref={ref} {...props}>
                {" "}
            </div>
        );
    }
);
MobileHeader.displayName = "Main site header for mobile";

export default MobileHeader;
