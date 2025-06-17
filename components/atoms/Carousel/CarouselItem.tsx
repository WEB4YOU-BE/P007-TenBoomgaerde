"use client";

import React, { type ComponentPropsWithoutRef, type FC } from "react";

import useCarousel from "@/hooks/use-carousel";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CarouselItem: FC<ComponentPropsWithoutRef<"div">> = ({
    className,
    ...props
}) => {
    const { orientation } = useCarousel();

    return (
        <div
            aria-roledescription="slide"
            className={cn(
                "min-w-0 shrink-0 grow-0 basis-full",
                orientation === "horizontal" ? "pl-4" : "pt-4",
                className
            )}
            data-slot="carousel-item"
            role="group"
            {...props}
        />
    );
};

export default CarouselItem;
