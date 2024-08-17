"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import { getRenterById } from "./actions";

interface RenterCellProps {
  id: string;
}
const RenterCell = ({ id }: RenterCellProps) => {
  const { data, isPending } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getRenterById(id),
    networkMode: "online",
    retry: true,
    staleTime: 1000 * 60, // 1 minute
  });

  return !isPending ? (
    `${data?.[0]?.firstname || "(geen voornaam)"} ${data?.[0]?.lastname || "(geen achternaam)"}`
  ) : (
    <LoaderPinwheel className="h-4 w-4 animate-spin" />
  );
};

export default RenterCell;
