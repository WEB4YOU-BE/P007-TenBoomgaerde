"use client";

import useCarousel from "@/hooks/use-carousel";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { type ComponentPropsWithoutRef } from "react";

const CarouselContent = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => {
    const { carouselRef, orientation } = useCarousel();

    return (
        <div
            className="overflow-hidden"
            data-slot="carousel-content"
            ref={carouselRef}
        >
            <div
                className={cn(
                    "flex",
                    orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
                    className
                )}
                {...props}
            />
        </div>
    );
};

export default CarouselContent;
