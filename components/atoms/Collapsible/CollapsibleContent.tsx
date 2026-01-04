"use client";

import { CollapsibleContent as Content } from "@radix-ui/react-collapsible";
import React, { type ComponentPropsWithoutRef } from "react";

const CollapsibleContent = ({
    ...props
}: ComponentPropsWithoutRef<typeof Content>) => (
    <Content data-slot="collapsible-content" {...props} />
);

export default CollapsibleContent;
