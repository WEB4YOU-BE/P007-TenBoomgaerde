import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

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
