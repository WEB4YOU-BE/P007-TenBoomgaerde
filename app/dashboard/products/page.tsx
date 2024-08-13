import { Metadata } from "next";
import { fetchProducts } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
  title: "Users",
  alternates: {
    canonical: "/dashboard/users/",
  },
};

export default async function Page() {
  const products = await fetchProducts();

  return <DataTable columns={columns} data={products} />;
}
