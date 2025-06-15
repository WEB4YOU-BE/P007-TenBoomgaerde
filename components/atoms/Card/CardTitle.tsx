import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

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
