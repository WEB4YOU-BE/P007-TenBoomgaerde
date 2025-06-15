import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { Content } from "@radix-ui/react-accordion";
import React, { type ComponentPropsWithoutRef } from "react";

const AccordionContent = ({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Content>) => (
    <Content
        className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
        data-slot="accordion-content"
        {...props}
    >
        <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </Content>
);

export default AccordionContent;
