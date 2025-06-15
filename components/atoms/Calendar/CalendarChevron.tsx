import type { ChevronProps } from "react-day-picker";

import {
    CaretDown,
    CaretLeft,
    CaretRight,
    CaretUp,
} from "@phosphor-icons/react/dist/ssr";
import React, { memo, useMemo } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const CalendarChevron = memo(
    ({ className, disabled, orientation = "left", size }: ChevronProps) => {
        const calculatedClassName = useMemo(
            () =>
                cn(disabled ? "opacity-50 cursor-not-allowed" : "", className),
            [className, disabled]
        );
        switch (orientation) {
            case "down":
                return (
                    <CaretDown className={calculatedClassName} size={size} />
                );
            case "left":
                return (
                    <CaretLeft className={calculatedClassName} size={size} />
                );
            case "right":
                return (
                    <CaretRight className={calculatedClassName} size={size} />
                );
            case "up":
                return <CaretUp className={calculatedClassName} size={size} />;
        }
    }
);
CalendarChevron.displayName = "CalendarChevron";

export default CalendarChevron;
