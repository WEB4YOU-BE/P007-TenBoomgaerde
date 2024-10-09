import { Metadata } from "next";
import React from "react";

import { fetchProducts } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/products/",
    },
    title: "Producten",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const products = await fetchProducts();

    return <DataTable columns={columns} data={products} />;
}
