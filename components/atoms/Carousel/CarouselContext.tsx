import { createContext } from "react";

import type { CarouselContextProps } from "@/types/components/carousel/CarouselContextProps";

const CarouselContext = createContext<CarouselContextProps | null>(null);

export default CarouselContext;
