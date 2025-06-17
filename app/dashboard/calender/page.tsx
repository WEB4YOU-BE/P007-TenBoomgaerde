import type { Metadata, NextPage } from "next";

import React from "react";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/calender/",
    },
    title: "Calender",
};

export const dynamic = "force-dynamic";

const Page: NextPage = () => <div>Calender</div>;

export default Page;
