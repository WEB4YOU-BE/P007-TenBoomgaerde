import { Metadata } from "next";
import { fetchHalls } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
  title: "Zalen",
  alternates: {
    canonical: "/dashboard/halls/",
  },
};

export default async function Page() {
  const halls = await fetchHalls();

  return <DataTable columns={columns} data={halls} />;
}
