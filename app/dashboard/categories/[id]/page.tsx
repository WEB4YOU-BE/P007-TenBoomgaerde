import { Metadata } from "next";
import React from "react";

// import UpdateCategoryForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/timeslots/",
    },
    title: "Tijdsblokken",
};

export const dynamic = "force-dynamic";

export default async function Page(/*{ params }: { params: { id: string } }*/) {
    return (
        <main className={"mx-auto md:max-w-screen-sm p-2 flex flex-col gap-2"}>
            <h1
                className={
                    "text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate pb-2"
                }
            >
                Categorie wijzigen
            </h1>
            {/* <UpdateCategoryForm id={params.id} /> */}
        </main>
    );
}
