import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Table = ({ className, ...props }: React.ComponentProps<"table">) => (
    <div
        className="relative w-full overflow-x-auto"
        data-slot="table-container"
    >
        <table
            className={cn("w-full caption-bottom text-sm", className)}
            data-slot="table"
            {...props}
        />
    </div>
);

export default Table;
