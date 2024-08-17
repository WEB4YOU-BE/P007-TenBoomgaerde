"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "./actions";
import { LoaderPinwheel } from "lucide-react";

interface CategoryCellProps {
  id: string;
}
const CategoryCell = ({ id }: CategoryCellProps) => {
  const { data, isPending } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    networkMode: "online",
    retry: true,
    staleTime: 1000 * 60, // 1 minute
  });

  return !isPending ? (
    data?.[0]?.name
  ) : (
    <LoaderPinwheel className="h-4 w-4 animate-spin" />
  );
};

export default CategoryCell;
