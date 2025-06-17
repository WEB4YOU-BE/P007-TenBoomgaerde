import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import Button from "@/components/atoms/Button";
import useCarousel from "@/hooks/use-carousel";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CarouselPrevious: FC<ComponentPropsWithoutRef<typeof Button>> = ({
    className,
    size = "icon",
    variant = "outline",
    ...props
}) => {
    const { canScrollPrev, orientation, scrollPrev } = useCarousel();

    return (
        <Button
            className={cn(
                "absolute size-8 rounded-full",
                orientation === "horizontal"
                    ? "top-1/2 -left-12 -translate-y-1/2"
                    : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
                className
            )}
            data-slot="carousel-previous"
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            size={size}
            variant={variant}
            {...props}
        >
            <ArrowLeft />
            <span className="sr-only">Previous slide</span>
        </Button>
    );
};

export default CarouselPrevious;
