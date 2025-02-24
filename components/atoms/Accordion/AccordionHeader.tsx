import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { Header, Trigger } from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import React, { type ComponentPropsWithoutRef } from "react";

const AccordionTrigger = ({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => (
    <Header className="flex">
        <Trigger
            className={cn(
                "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all hover:underline focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
                className
            )}
            data-slot="accordion-trigger"
            {...props}
        >
            {children}
            <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
        </Trigger>
    </Header>
);

export default AccordionTrigger;
