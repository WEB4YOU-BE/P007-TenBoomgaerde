import type { NextPage } from "next";

import UpdateProfileForm from "@/app/(root)/account/form";
import React from "react";

const dynamic = "force-dynamic";

const Page: NextPage = async () => (
    <main className={"container max-w-(--breakpoint-xl) mx-auto p-2 px-4"}>
        <h1 className={"text-4xl font-bold text-center mb-8"}>
            Gebruikersinformatie
        </h1>
        <div className={"w-full flex"}>
            <UpdateProfileForm />
        </div>
    </main>
);

export default Page;
export { dynamic };
