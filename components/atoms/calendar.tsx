"use client";

import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
} from "lucide-react";
import * as React from "react";
import { DayFlag, DayPicker, SelectionState, UI } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export const Calendar = ({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) => {
    return (
        <DayPicker
            className={cn("p-3", className)}
            classNames={{
                [DayFlag.disabled]: "text-muted-foreground opacity-50",
                [DayFlag.hidden]: "invisible",
                [DayFlag.outside]:
                    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                [DayFlag.today]: "bg-accent text-accent-foreground",
                [SelectionState.range_end]: "day-range-end",
                [SelectionState.range_middle]:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                [SelectionState.selected]:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                [UI.CaptionLabel]: "text-sm font-medium",
                [UI.Day]:
                    "h-9 w-9 text-center rounded-md text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                [UI.DayButton]: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary hover:text-primary-foreground"
                ),
                [UI.Month]: "space-y-4 ml-0",
                [UI.MonthCaption]: "flex justify-center items-center h-7",
                [UI.MonthGrid]: "w-full border-collapse space-y-1",
                [UI.Months]: "relative",
                [UI.NextMonthButton]: cn(
                    buttonVariants({ variant: "outline" }),
                    "absolute right-1 top-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                [UI.PreviousMonthButton]: cn(
                    buttonVariants({ variant: "outline" }),
                    "absolute left-1 top-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                [UI.Week]: "flex w-full mt-2",
                [UI.Weekday]:
                    "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                [UI.Weekdays]: "flex",
                ...classNames,
            }}
            components={{
                Chevron: ({ ...props }) => <Chevron {...props} />,
            }}
            showOutsideDays={showOutsideDays}
            {...props}
        />
    );
};

const Chevron = ({ orientation = "left" }) => {
    switch (orientation) {
        case "down":
            return <ChevronDownIcon className="h-4 w-4" />;
        case "left":
            return <ChevronLeftIcon className="h-4 w-4" />;
        case "right":
            return <ChevronRightIcon className="h-4 w-4" />;
        case "up":
            return <ChevronUpIcon className="h-4 w-4" />;
        default:
            return null;
    }
};
