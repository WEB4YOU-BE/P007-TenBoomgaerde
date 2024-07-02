import { Metadata } from "next";
import { fetchReservations } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
  title: "Users",
  alternates: {
    canonical: "/dashboard/users/",
  },
};

export default async function Page() {
  const reservations = await fetchReservations();

  return <DataTable columns={columns} data={reservations} />;
}
