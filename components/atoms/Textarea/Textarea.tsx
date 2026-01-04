import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Textarea = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"textarea">) => (
    <textarea
        className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/20 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-hidden transition-[color,box-shadow] focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
        )}
        data-slot="textarea"
        {...props}
    />
);

export default Textarea;
