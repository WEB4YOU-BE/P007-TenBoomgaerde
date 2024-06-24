import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import ResetWithEmailCredentialsForm from "./form";

export const metadata: Metadata = {
  title: "Herstel uw account",
  alternates: {
    canonical: "/authentication/recover/",
  },
};

export default async function Page() {
  return (
    <>
      <Card className="w-[350px] max-w-[100dvw]">
        <CardHeader>
          <CardTitle>Herstel uw account</CardTitle>
          <CardDescription>Gebruik hiervoor uw email.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetWithEmailCredentialsForm />
        </CardContent>
      </Card>
    </>
  );
}
