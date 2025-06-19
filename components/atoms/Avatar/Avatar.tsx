import { Root } from "@radix-ui/react-avatar";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Avatar = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Root>) => {
    return (
        <Root
            className={cn(
                "relative flex size-8 shrink-0 overflow-hidden rounded-full",
                className
            )}
            data-slot="avatar"
            {...props}
        />
    );
};

export default Avatar;
