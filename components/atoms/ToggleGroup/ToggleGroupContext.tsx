"use client";

import { createContext } from "react";

import { type ToggleVariantProps } from "@/utils/tailwindcss/variants/toggleVariants";

const ToggleGroupContext = createContext<ToggleVariantProps>({
    size: "default",
    variant: "default",
});

export default ToggleGroupContext;
