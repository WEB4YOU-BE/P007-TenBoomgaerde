import { Metadata } from "next";
import React from "react";

import { fetchUsers } from "./actions";
import { columns, DataTable } from "./table";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/users/",
    },
    title: "Users",
};

export default async function Page() {
    const users = await fetchUsers();

    return <DataTable columns={columns} data={users} />;
}
