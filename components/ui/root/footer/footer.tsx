import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { forwardRef, HTMLAttributes } from "react";
import React from "react";

import DesktopFooter from "./desktop-footer";
import MobileFooter from "./mobile-footer";

type FooterProps = HTMLAttributes<HTMLDivElement>;
const Footer = forwardRef<HTMLDivElement, FooterProps>(
    ({ className, ...props }, ref) => {
        return (
            <>
                <DesktopFooter
                    className={cn("max-lg:hidden", className)}
                    ref={ref}
                    {...props}
                />
                <MobileFooter
                    className={cn("lg:hidden", className)}
                    ref={ref}
                    {...props}
                />
            </>
        );
    }
);
Footer.displayName = "Main site footer";

export default Footer;
