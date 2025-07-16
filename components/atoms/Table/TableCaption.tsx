import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TableCaption = ({
    className,
    ...props
}: React.ComponentProps<"caption">) => (
    <caption
        className={cn("text-muted-foreground mt-4 text-sm", className)}
        data-slot="table-caption"
        {...props}
    />
);

export default TableCaption;
