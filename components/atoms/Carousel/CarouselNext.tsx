import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import React, { type ComponentPropsWithoutRef, type FC } from "react";

import Button from "@/components/atoms/Button";
import useCarousel from "@/hooks/use-carousel";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CarouselNext: FC<ComponentPropsWithoutRef<typeof Button>> = ({
    className,
    size = "icon",
    variant = "outline",
    ...props
}) => {
    const { canScrollNext, orientation, scrollNext } = useCarousel();

    return (
        <Button
            className={cn(
                "absolute size-8 rounded-full",
                orientation === "horizontal"
                    ? "top-1/2 -right-12 -translate-y-1/2"
                    : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
                className
            )}
            data-slot="carousel-next"
            disabled={!canScrollNext}
            onClick={scrollNext}
            size={size}
            variant={variant}
            {...props}
        >
            <ArrowRightIcon />
            <span className="sr-only">Next slide</span>
        </Button>
    );
};

export default CarouselNext;
