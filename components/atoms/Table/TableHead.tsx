import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
        className={cn(
            "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        data-slot="table-head"
        {...props}
    />
);

export default TableHead;
