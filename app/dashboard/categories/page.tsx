import { Metadata } from "next";
import { fetchCategories } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
  title: "Tijdsblokken",
  alternates: {
    canonical: "/dashboard/timeslots/",
  },
};

export default async function Page() {
  const categories = await fetchCategories();

  return <DataTable columns={columns} data={categories} />;
}
