"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "./actions";
import { toast } from "sonner";

interface CategoryCellProps {
  id: string;
}
const CategoryCell = ({ id }: CategoryCellProps) => {
  const { data } = useQuery({
    queryKey: ["Category"],
    queryFn: () => getCategoryById(id),
    networkMode: "online",
    retry: true,
  });

  return <span>{data?.[0].name}</span>;
};

export default CategoryCell;
