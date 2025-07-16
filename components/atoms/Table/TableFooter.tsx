import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TableFooter = ({
    className,
    ...props
}: React.ComponentProps<"tfoot">) => (
    <tfoot
        className={cn(
            "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
            className
        )}
        data-slot="table-footer"
        {...props}
    />
);

export default TableFooter;
