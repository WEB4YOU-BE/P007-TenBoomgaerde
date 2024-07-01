import UsersTable from "@/components/business/users/users-table";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alle gebruikers",
  description:
    "Bekijk de lijst van aangemelde gebruikers bij VZW Ten Boomgaerde Lichtervelde.",
};

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from("users").select();
  if (!data) return <></>;

  return (
    <main className={"flex flex-col gap-2"}>
      <div className={"flex flex-col gap-2 p-4 md:flex-row"}>
        <h1
          className={
            "text-4xl font-extrabold tracking-tight md:flex-grow lg:text-5xl"
          }
        >
          Gebruikers
        </h1>
      </div>
      <UsersTable users={data} />
    </main>
  );
}
