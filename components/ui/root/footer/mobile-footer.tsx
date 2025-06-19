import { forwardRef, HTMLAttributes } from "react";
import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

type MobileFooterProps = HTMLAttributes<HTMLDivElement>;
const MobileFooter = forwardRef<HTMLDivElement, MobileFooterProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className={cn("", className)} ref={ref} {...props}>
                {" "}
            </div>
        );
    }
);
MobileFooter.displayName = "Main site footer for mobile";

export default MobileFooter;
