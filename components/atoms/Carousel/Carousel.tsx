"use client";

import useEmblaCarousel from "embla-carousel-react";
import React, {
    type ComponentPropsWithoutRef,
    type FC,
    type KeyboardEvent,
    useCallback,
    useEffect,
    useState,
} from "react";

import type { CarouselApi } from "@/types/components/carousel/CarouselApi";
import type { CarouselProps } from "@/types/components/carousel/CarouselProps";

import CarouselContext from "@/components/atoms/Carousel/CarouselContext";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Carousel: FC<CarouselProps & ComponentPropsWithoutRef<"div">> = ({
    children,
    className,
    opts,
    orientation = "horizontal",
    plugins,
    setApi,
    ...props
}) => {
    const [carouselRef, api] = useEmblaCarousel(
        { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
        plugins
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
        if (!api) return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                scrollNext();
            }
        },
        [scrollPrev, scrollNext]
    );

    useEffect(() => {
        if (!api || !setApi) return;
        setApi(api);
    }, [api, setApi]);

    useEffect(() => {
        if (!api) return;
        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);

        return () => {
            api?.off("select", onSelect);
        };
    }, [api, onSelect]);

    return (
        <CarouselContext.Provider
            value={{
                api: api,
                canScrollNext,
                canScrollPrev,
                carouselRef,
                opts,
                orientation:
                    orientation ||
                    (opts?.axis === "y" ? "vertical" : "horizontal"),
                scrollNext,
                scrollPrev,
            }}
        >
            <div
                aria-roledescription="carousel"
                className={cn("relative", className)}
                data-slot="carousel"
                onKeyDownCapture={handleKeyDown}
                role="region"
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    );
};

export default Carousel;
