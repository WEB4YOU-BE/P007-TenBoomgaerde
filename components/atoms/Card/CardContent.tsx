import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

const CardContent: FC<ComponentPropsWithoutRef<"div">> = ({
    className,
    ...props
}) => (
    <div
        className={cn("p-6 pt-0", className)}
        data-slot="card-content"
        {...props}
    />
);

export default CardContent;
