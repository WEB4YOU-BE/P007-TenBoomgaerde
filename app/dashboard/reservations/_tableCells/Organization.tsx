"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import { getOrganizationById } from "./actions";

interface OrganisationCellProps {
  id: string;
}
const OrganisationCell = ({ id }: OrganisationCellProps) => {
  const { data, isPending } = useQuery({
    queryKey: ["organisation", id],
    queryFn: () => getOrganizationById(id),
    networkMode: "online",
    retry: true,
    staleTime: 1000 * 60, // 1 minute
  });

  return !isPending ? (
    `${data?.[0].name || "geen naam"}`
  ) : (
    <LoaderPinwheel className="h-4 w-4 animate-spin" />
  );
};

export default OrganisationCell;
