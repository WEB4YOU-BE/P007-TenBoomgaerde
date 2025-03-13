import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { Root } from "@radix-ui/react-label";
import React, { type ComponentPropsWithoutRef } from "react";

const Label = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Root>) => {
    return (
        <Root
            className={cn(
                "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                className
            )}
            data-slot="label"
            {...props}
        />
    );
};

export default Label;
