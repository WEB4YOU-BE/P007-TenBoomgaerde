"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "./actions";

interface CategoryCellProps {
  id?: string | null;
}
const CategoryCell = ({ id }: CategoryCellProps) => {
  const { data } = useQuery({
    queryKey: ["Category"],
    queryFn: () => getCategoryById(id || ""),
    networkMode: "online",
    retry: true,
  });

  if (!id) return "geen categorie";

  return data?.[0].name;
};

export default CategoryCell;
