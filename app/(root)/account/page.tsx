import React from "react";

import UpdateProfileForm from "./form";

export const dynamic = "force-dynamic";

export default async function page() {
    return (
        <main className={"container max-w-screen-xl mx-auto p-2 px-4"}>
            <h1 className={"text-4xl font-bold text-center mb-8"}>
                Gebruikersinformatie
            </h1>
            <div className={"w-full flex"}>
                <UpdateProfileForm />
            </div>
        </main>
    );
}
