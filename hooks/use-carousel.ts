import CarouselContext from "@/components/atoms/Carousel/CarouselContext";
import { useContext } from "react";

const useCarousel = () => {
    const context = useContext(CarouselContext);

    if (!context)
        throw new Error("useCarousel must be used within a <Carousel />");

    return context;
};

export default useCarousel;
