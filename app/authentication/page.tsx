import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/tailwindcss/MergeCN";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authenticeren",
  alternates: {
    canonical: "/authentication/",
  },
};

export default async function Page() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Welkom</CardTitle>
          <CardDescription>Gebruik of maak uw account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Link
            href={"/authentication/sign-in/"}
            className={cn(buttonVariants(), "justify-start")}
          >
            Log in
          </Link>
          <Link
            href={"/authentication/sign-up/"}
            className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
          >
            Maak account
          </Link>
        </CardContent>
        <CardFooter>
          <Link
            href={"/authentication/recover/"}
            className={cn(buttonVariants({ variant: "link" }))}
          >
            Ik kan me niet aanmelden
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
