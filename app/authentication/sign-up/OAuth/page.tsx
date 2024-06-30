import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/atoms/alert";

export const metadata: Metadata = {
  title: "Meld aan met derde partij",
  alternates: {
    canonical: "/authentication/sign-up/OAuth/",
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
