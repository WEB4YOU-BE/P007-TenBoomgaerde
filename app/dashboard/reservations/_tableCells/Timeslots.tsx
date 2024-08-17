"use client";

import { useQuery } from "@tanstack/react-query";
import { getTimeslotById } from "./actions";
import { LoaderPinwheel } from "lucide-react";

interface TimeslotsCellProps {
  startHourID: string;
  endHourID: string;
}
const TimeslotsCell = ({ startHourID, endHourID }: TimeslotsCellProps) => {
  const { data: start_hour, isPending: isPendingStartHour } = useQuery({
    queryKey: ["timeslot", startHourID],
    queryFn: () => getTimeslotById(startHourID),
    networkMode: "online",
    retry: true,
    staleTime: 1000 * 60, // 1 minute
  });

  const { data: end_hour, isPending: isPendingEndHour } = useQuery({
    queryKey: ["timeslot", endHourID],
    queryFn: () => getTimeslotById(endHourID),
    networkMode: "online",
    retry: true,
    staleTime: 1000 * 60, // 1 minute
  });

  return !(isPendingStartHour || isPendingEndHour) ? (
    `${start_hour?.[0].start_hour}${start_hour?.[0].start_hour === end_hour?.[0].end_hour ? "" : " tot " + end_hour?.[0].end_hour}`
  ) : (
    <LoaderPinwheel className="h-4 w-4 animate-spin" />
  );
};

export default TimeslotsCell;
