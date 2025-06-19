"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import React, { ComponentPropsWithoutRef } from "react";

const Collapsible = ({
    ...props
}: ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>) => {
    return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
};

const CollapsibleContent = ({
    ...props
}: ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.CollapsibleContent
>) => {
    return (
        <CollapsiblePrimitive.CollapsibleContent
            data-slot="collapsible-content"
            {...props}
        />
    );
};

const CollapsibleTrigger = ({
    ...props
}: ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.CollapsibleTrigger
>) => {
    return (
        <CollapsiblePrimitive.CollapsibleTrigger
            data-slot="collapsible-trigger"
            {...props}
        />
    );
};

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
