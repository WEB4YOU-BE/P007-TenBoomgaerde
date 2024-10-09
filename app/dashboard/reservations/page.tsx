import { Metadata } from "next";
import React from "react";

import { fetchReservations } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/reservations/",
    },
    title: "Reserveringen",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const reservations = await fetchReservations();

    return <DataTable columns={columns} data={reservations} />;
}
