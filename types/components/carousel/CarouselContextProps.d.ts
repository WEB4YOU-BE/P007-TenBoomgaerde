import type { CarouselProps } from "@/types/components/carousel/CarouselProps";

import useEmblaCarousel from "embla-carousel-react";

interface CarouselContextProps extends CarouselProps {
    api: ReturnType<typeof useEmblaCarousel>[1];
    canScrollNext: boolean;
    canScrollPrev: boolean;
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    scrollNext: () => void;
    scrollPrev: () => void;
}
