import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CardDescription: FC<ComponentPropsWithoutRef<"div">> = ({
    className,
    ...props
}) => (
    <div
        className={cn("text-muted-foreground text-sm", className)}
        data-slot="card-description"
        {...props}
    />
);

export default CardDescription;
