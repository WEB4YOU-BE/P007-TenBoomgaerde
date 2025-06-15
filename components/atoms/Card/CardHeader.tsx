import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CardHeader: FC<ComponentPropsWithoutRef<"div">> = ({
    className,
    ...props
}) => (
    <div
        className={cn("flex flex-col gap-1.5 p-6", className)}
        data-slot="card-header"
        {...props}
    />
);

export default CardHeader;
