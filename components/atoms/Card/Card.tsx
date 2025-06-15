import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Card: FC<ComponentPropsWithoutRef<"div">> = ({ className, ...props }) => (
    <div
        className={cn(
            "bg-card text-card-foreground rounded-xl border shadow-sm",
            className
        )}
        data-slot="card"
        {...props}
    />
);

export default Card;
