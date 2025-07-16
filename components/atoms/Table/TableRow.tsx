import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr
        className={cn(
            "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
            className
        )}
        data-slot="table-row"
        {...props}
    />
);

export default TableRow;
