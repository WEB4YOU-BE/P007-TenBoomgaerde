import { Metadata } from "next";
import { fetchProducts } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
  title: "Producten",
  alternates: {
    canonical: "/dashboard/products/",
  },
};

export default async function Page() {
  const products = await fetchProducts();

  return <DataTable columns={columns} data={products} />;
}
