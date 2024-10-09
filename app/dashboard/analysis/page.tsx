import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/analysis/",
    },
    title: "Analyse",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    return <></>;
}
