import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => (
    <tbody
        className={cn("[&_tr:last-child]:border-0", className)}
        data-slot="table-body"
        {...props}
    />
);

export default TableBody;
