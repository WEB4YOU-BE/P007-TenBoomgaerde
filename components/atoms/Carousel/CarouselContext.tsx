import type { CarouselContextProps } from "@/types/components/carousel/CarouselContextProps";

import { createContext } from "react";

const CarouselContext = createContext<CarouselContextProps | null>(null);

export default CarouselContext;
