"use client";

import { Root } from "@radix-ui/react-tabs";
import { type ComponentPropsWithoutRef } from "react";

const Tabs = (props: ComponentPropsWithoutRef<typeof Root>) => (
    <Root data-slot="tabs" {...props} />
);

export default Tabs;
