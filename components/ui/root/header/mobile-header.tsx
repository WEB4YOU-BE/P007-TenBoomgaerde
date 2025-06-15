import Alert from "@/components/atoms/Alert";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { ComponentPropsWithRef, FC } from "react";
import React from "react";

interface MobileHeaderProps extends ComponentPropsWithRef<"div"> {
    items: NavigationItem[];
}
const MobileHeader: FC<MobileHeaderProps> = ({ className, ref, ...props }) => (
    <div className={cn("p-2", className)} ref={ref} {...props}>
        <Alert
            className="bg-destructive-foreground text-balance"
            variant={"destructive"}
        >
            We zijn momenteel bezig met het ontwikkelen van de mobiele website.
            Probeer het later nog eens of bezoek de website op een desktop.
        </Alert>
    </div>
);

export default MobileHeader;
