import { ComponentPropsWithRef, FC } from "react";
import React from "react";

import Alert, { AlertDescription, AlertTitle } from "@/components/atoms/Alert";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface MobileHeaderProps extends ComponentPropsWithRef<"div"> {
    items: NavigationItem[];
}
const MobileHeader: FC<MobileHeaderProps> = ({ className, ref, ...props }) => (
    <div className={cn("p-2", className)} ref={ref} {...props}>
        <Alert
            className="bg-destructive-foreground text-balance"
            variant="destructive"
        >
            <AlertTitle>Mobiele website in ontwikkeling</AlertTitle>
            <AlertDescription>
                <p>
                    We zijn momenteel bezig met het ontwikkelen van de mobiele
                    website. Probeer het later nog eens of bezoek de website op
                    een desktop.
                </p>
                <ul className="list-inside list-disc text-sm mt-2">
                    <li>Controleer later opnieuw</li>
                    <li>Gebruik een desktop voor volledige functionaliteit</li>
                    <li>Neem contact op bij vragen</li>
                </ul>
            </AlertDescription>
        </Alert>
    </div>
);

export default MobileHeader;
