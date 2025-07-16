import { ComponentPropsWithRef } from "react";
import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CardAction = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
    <div
        className={cn(
            "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
            className
        )}
        data-slot="card-action"
        {...props}
    />
);

export default CardAction;
