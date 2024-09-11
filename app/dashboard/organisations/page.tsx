import { Metadata } from "next";
import React from "react";

import { fetchOrganizations } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/organisations/",
    },
    title: "Organisaties",
};

export default async function Page() {
    const organizations = await fetchOrganizations();

    return <DataTable columns={columns} data={organizations} />;
}
