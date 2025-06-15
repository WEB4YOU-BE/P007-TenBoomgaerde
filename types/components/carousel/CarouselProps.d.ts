import type { CarouselApi } from "@/types/components/carousel/CarouselApi";
import type { CarouselOptions } from "@/types/components/carousel/CarouselOptions";
import type { CarouselPlugin } from "@/types/components/carousel/CarouselPlugin";

type CarouselProps = {
    opts?: CarouselOptions;
    orientation?: "horizontal" | "vertical";
    plugins?: CarouselPlugin;
    setApi?: (api: CarouselApi) => void;
};

export type { CarouselProps };
