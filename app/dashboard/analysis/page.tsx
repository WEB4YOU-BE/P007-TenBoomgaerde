import { Metadata } from "next";
import React from "react";

import {
    fetchApprovedReservationsPreviousMonth,
    fetchApprovedReservationsThisMonth,
    fetchApprovedReservationsThisWeek,
} from "./actions";
import DownloadComponent from "./component";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/analysis/",
    },
    title: "Analyse",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const resThisWeek = await fetchApprovedReservationsThisWeek();
    const resThisMonth = await fetchApprovedReservationsThisMonth();
    const resPrevMonth = await fetchApprovedReservationsPreviousMonth();

    return (
        <>
            <div className="flex flex-col gap-2">
                <DownloadComponent
                    reservations={resThisWeek}
                    text="Reservaties deze week"
                />
                <DownloadComponent
                    reservations={resThisMonth}
                    text="Reservaties deze maand"
                />
                <DownloadComponent
                    reservations={resPrevMonth}
                    text="Reservaties vorige maand"
                />
            </div>
        </>
    );
}
