"use client";

import { Command as CommandPrimitive } from "cmdk";
import React, { type ComponentPropsWithoutRef } from "react";

const CommandEmpty = ({
    ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) => (
    <CommandPrimitive.Empty
        className="py-6 text-center text-sm"
        data-slot="command-empty"
        {...props}
    />
);

export default CommandEmpty;
