import { Root } from "@radix-ui/react-accordion";
import React, { type ComponentPropsWithoutRef } from "react";

const Accordion = ({ ...props }: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="accordion" {...props} />
);

export default Accordion;
