import { Fallback } from "@radix-ui/react-avatar";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const AvatarFallback = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Fallback>) => (
    <Fallback
        className={cn(
            "bg-muted flex size-full items-center justify-center rounded-full",
            className
        )}
        data-slot="avatar-fallback"
        {...props}
    />
);

export default AvatarFallback;
