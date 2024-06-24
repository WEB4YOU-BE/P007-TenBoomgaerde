import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VZW Ten Boomgaerde Lichtervelde",
  alternates: {
    canonical: "/",
  },
};

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <Card className="w-fit m-10">
        <CardHeader>
          <CardTitle>Gebruiker</CardTitle>
        </CardHeader>
        <CardContent>user: {data.user?.email}</CardContent>
        <CardContent>error: {JSON.stringify(error, null, 2)}</CardContent>
        {!data?.user && (
          <CardFooter>
            <Link href={"/authentication/"}>Sign in</Link>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
