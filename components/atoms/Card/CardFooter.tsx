import React, { type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CardFooter: FC<ComponentPropsWithoutRef<"div">> = ({
    className,
    ...props
}) => (
    <div
        className={cn("flex items-center p-6 pt-0", className)}
        data-slot="card-footer"
        {...props}
    />
);

export default CardFooter;
