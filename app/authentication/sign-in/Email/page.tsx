import { Metadata } from "next";
import SignInWithEmailCredentialsForm from "./form";

export const metadata: Metadata = {
    title: "Log in via email",
    alternates: {
        canonical: "/authentication/sign-in/Email/",
    },
};

export default async function Page() {
    return <SignInWithEmailCredentialsForm />;
}
