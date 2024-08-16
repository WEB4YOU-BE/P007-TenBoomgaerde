import { Metadata } from "next";
import { fetchTimeslots } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
  title: "Tijdsblokken",
  alternates: {
    canonical: "/dashboard/timeslots/",
  },
};

export default async function Page() {
  const timeslots = await fetchTimeslots();

  return <DataTable columns={columns} data={timeslots} />;
}
