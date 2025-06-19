import { Metadata } from "next";
import React from "react";

import { fetchCategories } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/timeslots/",
    },
    title: "Tijdsblokken",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const categories = await fetchCategories();

    return <DataTable columns={columns} data={categories} />;
}
