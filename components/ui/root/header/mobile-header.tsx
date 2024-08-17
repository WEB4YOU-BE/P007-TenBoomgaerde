import { cn } from "@/utils/tailwindcss/MergeCN";
import { forwardRef, HTMLAttributes } from "react";

interface MobileHeaderProps extends HTMLAttributes<HTMLDivElement> {
  items: NavigationItem[];
}
const MobileHeader = forwardRef<HTMLDivElement, MobileHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        MobileHeader
      </div>
    );
  },
);
MobileHeader.displayName = "Main site header for mobile";

export default MobileHeader;
