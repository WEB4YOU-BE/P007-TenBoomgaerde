import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

const CardTitle: FC<ComponentPropsWithoutRef<"div">> = ({
    className,
    ...props
}) => (
    <div
        className={cn("leading-none font-semibold tracking-tight", className)}
        data-slot="card-title"
        {...props}
    />
);

export default CardTitle;
