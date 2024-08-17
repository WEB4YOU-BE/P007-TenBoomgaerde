import { cn } from "@/utils/tailwindcss/MergeCN";
import { forwardRef, HTMLAttributes } from "react";
import DesktopFooter from "./desktop-footer";
import MobileFooter from "./mobile-footer";

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}
const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return (
        <>
          <DesktopFooter
            ref={ref}
            className={cn("max-lg:hidden", className)}
            {...props}
          />
          <MobileFooter
            ref={ref}
            className={cn("lg:hidden", className)}
            {...props}
          />
        </>
      );
  },
);
Footer.displayName = "Main site footer";

export default Footer;
