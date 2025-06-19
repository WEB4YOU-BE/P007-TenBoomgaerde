import { Metadata } from "next";
import React from "react";

import { fetchTimeslots } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/timeslots/",
    },
    title: "Tijdsblokken",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const timeslots = await fetchTimeslots();

    return <DataTable columns={columns} data={timeslots} />;
}
