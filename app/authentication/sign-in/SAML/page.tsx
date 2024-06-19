import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Log in via SSO",
  alternates: {
    canonical: "/authentication/sign-in/SAML/",
  },
};

export default async function Page() {
  return (
    <>
      <Alert>
        <AlertTitle>Komt binnenkort!</AlertTitle>
        <AlertDescription>
          Deze functie is nog niet beschikbaar.
        </AlertDescription>
      </Alert>
    </>
  );
}
