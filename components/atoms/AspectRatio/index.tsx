import { Root } from "@radix-ui/react-aspect-ratio";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

const AspectRatio: FC<ComponentPropsWithoutRef<typeof Root>> = (props) => (
    <Root data-slot="aspect-ratio" {...props} />
);

export default AspectRatio;
