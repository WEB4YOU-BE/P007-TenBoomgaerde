import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Welkom</CardTitle>
          <CardDescription>Maak uw account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">{children}</CardContent>
      </Card>
    </>
  );
}
