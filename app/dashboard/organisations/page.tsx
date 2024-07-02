import { Metadata } from "next";
import { fetchUsers } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
  title: "Users",
  alternates: {
    canonical: "/dashboard/users/",
  },
};

export default async function Page() {
  const users = await fetchUsers();

  return <DataTable columns={columns} data={users} />;
}
