import { Metadata } from "next";
import React from "react";

import { fetchHalls } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/halls/",
    },
    title: "Zalen",
};

export default async function Page() {
    const halls = await fetchHalls();

    return <DataTable columns={columns} data={halls} />;
}
