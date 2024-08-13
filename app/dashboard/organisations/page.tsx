import { Metadata } from "next";
import { columns, DataTable } from "./table";
import { fetchOrganizations } from "./actions";

export const metadata: Metadata = {
  title: "Users",
  alternates: {
    canonical: "/dashboard/users/",
  },
};

export default async function Page() {
  const organizations = await fetchOrganizations();

  return <DataTable columns={columns} data={organizations} />;
}
