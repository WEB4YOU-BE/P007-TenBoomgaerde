import { Item } from "@radix-ui/react-accordion";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const AccordionItem = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Item>) => (
    <Item
        className={cn("border-b last:border-b-0", className)}
        data-slot="accordion-item"
        {...props}
    />
);

export default AccordionItem;
