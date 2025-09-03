import { isWithinInterval } from "date-fns";

interface FilterByDateRange {
    end?: Date;
    filterEnd?: Date;
    filterStart?: Date;
    start?: Date;
}
/**
 * Filters a date range based on the provided start and end dates.
 *
 * @param start - The start date of the reservation.
 * @param end - The end date of the reservation.
 * @param filterStart - The start date of the filter range.
 * @param filterEnd - The end date of the filter range.
 * @returns A boolean indicating if the reservation falls within the filter range.
 */
const filterByDateRange = ({
    end,
    filterEnd,
    filterStart,
    start,
}: FilterByDateRange): boolean => {
    if (!filterStart && !filterEnd) return true;
    if (!start || !end) return false;
    if (filterStart && !filterEnd)
        return start >= filterStart || end >= filterStart;
    if (!filterStart && filterEnd)
        return start <= filterEnd || end <= filterEnd;

    if (!filterStart || !filterEnd) return true;
    return (
        isWithinInterval(start, { end: filterEnd, start: filterStart }) ||
        isWithinInterval(end, { end: filterEnd, start: filterStart })
    );
};

export default filterByDateRange;
