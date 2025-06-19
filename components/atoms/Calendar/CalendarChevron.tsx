import type { ChevronProps } from "react-day-picker";

import {
    CaretDownIcon,
    CaretLeftIcon,
    CaretRightIcon,
    CaretUpIcon,
} from "@phosphor-icons/react/ssr";
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
                    <CaretDownIcon
                        className={calculatedClassName}
                        size={size}
                    />
                );
            case "left":
                return (
                    <CaretLeftIcon
                        className={calculatedClassName}
                        size={size}
                    />
                );
            case "right":
                return (
                    <CaretRightIcon
                        className={calculatedClassName}
                        size={size}
                    />
                );
            case "up":
                return (
                    <CaretUpIcon className={calculatedClassName} size={size} />
                );
        }
    }
);
CalendarChevron.displayName = "CalendarChevron";

export default CalendarChevron;
