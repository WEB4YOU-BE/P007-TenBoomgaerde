import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const TableHeader = ({
    className,
    ...props
}: React.ComponentProps<"thead">) => (
    <thead
        className={cn("[&_tr]:border-b", className)}
        data-slot="table-header"
        {...props}
    />
);

export default TableHeader;
