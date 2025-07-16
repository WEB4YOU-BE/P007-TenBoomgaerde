import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
        className={cn(
            "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        data-slot="table-cell"
        {...props}
    />
);

export default TableCell;
