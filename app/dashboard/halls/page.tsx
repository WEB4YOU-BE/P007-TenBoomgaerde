import { Metadata } from "next";
import { fetchHalls } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
  title: "Users",
  alternates: {
    canonical: "/dashboard/users/",
  },
};

export default async function Page() {
  const halls = await fetchHalls();

  return <DataTable columns={columns} data={halls} />;
}
