import type { Metadata, NextPage } from "next";

import React from "react";

import SignOutForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-out/",
    },
    title: "Log uit",
};

const Page: NextPage = () => <SignOutForm />;

export default Page;
