import { cn } from "@/utils/tailwindcss/MergeCN";
import { forwardRef, HTMLAttributes } from "react";

interface MobileFooterProps extends HTMLAttributes<HTMLDivElement> {}
const MobileFooter = forwardRef<HTMLDivElement, MobileFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        footer on mobile
      </div>
    );
  },
);
MobileFooter.displayName = "Main site footer for mobile";

export default MobileFooter;
