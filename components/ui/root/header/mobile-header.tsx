import Alert from "@/components/atoms/Alert";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { forwardRef, HTMLAttributes } from "react";
import React from "react";

interface MobileHeaderProps extends HTMLAttributes<HTMLDivElement> {
    items: NavigationItem[];
}
const MobileHeader = forwardRef<HTMLDivElement, MobileHeaderProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className={cn("p-2", className)} ref={ref} {...props}>
                <Alert
                    className="bg-destructive-foreground text-balance"
                    variant={"destructive"}
                >
                    We zijn momenteel bezig met het ontwikkelen van de mobiele
                    website. Probeer het later nog eens of bezoek de website op
                    een desktop.
                </Alert>
            </div>
        );
    }
);
MobileHeader.displayName = "Main site header for mobile";

export default MobileHeader;
