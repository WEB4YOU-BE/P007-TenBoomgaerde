"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import React, { ComponentPropsWithoutRef, FC } from "react";

const AspectRatio: FC<
    ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
> = (props) => {
    return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
};

export { AspectRatio };
