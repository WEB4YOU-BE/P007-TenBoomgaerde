import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/calender/",
    },
    title: "Calender",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    return <div>Calender</div>;
}
