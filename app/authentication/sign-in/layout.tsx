import { ReactNode } from "react";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/tailwindcss/MergeCN";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Welkom</CardTitle>
          <CardDescription>Gebruik uw account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">{children}</CardContent>
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
