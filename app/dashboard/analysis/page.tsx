import { buttonVariants } from "@/components/atoms/button";
import ReservationsTable from "@/components/business/reservations/reservations-table";
import { createClient } from "@/utils/supabase/server";
import { cn } from "@/utils/tailwindcss/MergeCN";
import { Printer } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const supabase = createClient();
  const { data: reservationsThisWeek } = await supabase
    .from("reservations")
    .select();
  const { data: reservationsThisMonth } = await supabase
    .from("reservations")
    .select();
  const { data: reservationsPreviousMonth } = await supabase
    .from("reservations")
    .select();

  if (!reservationsThisWeek) return <></>;
  if (!reservationsThisMonth) return <></>;
  if (!reservationsPreviousMonth) return <></>;

  return (
    <main className={"flex flex-col gap-2"}>
      <div className={"m-5 rounded-2xl border border-gray-300 p-2"}>
        <div className={"flex flex-col gap-2 p-4 md:flex-row"}>
          <h1
            className={
              "text-4xl font-extrabold tracking-tight md:flex-grow lg:text-5xl"
            }
          >
            Reservaties deze week
          </h1>
          <Link
            href={"/dashboard/analysis/this-week-to-PDF"}
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex flex-row gap-2",
            )}
          >
            <Printer size={16} />
            Afdrukken
          </Link>
        </div>
        <ReservationsTable reservations={reservationsThisWeek} />
      </div>
      <div className={"m-5 rounded-2xl border border-gray-300 p-2"}>
        <div className={"flex flex-col gap-2 p-4 md:flex-row"}>
          <h1
            className={
              "text-4xl font-extrabold tracking-tight md:flex-grow lg:text-5xl"
            }
          >
            Reservaties deze maand
          </h1>
          {/*<Link href={"/dashboard/analyses/weekPDF"}
                className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><Printer
              size={16}/>Afdrukken</Link>*/}
        </div>
        <ReservationsTable reservations={reservationsThisMonth} />
      </div>
      <div className={"m-5 rounded-2xl border border-gray-300 p-2"}>
        <div className={"flex flex-col gap-2 p-4 md:flex-row"}>
          <h1
            className={
              "text-4xl font-extrabold tracking-tight md:flex-grow lg:text-5xl"
            }
          >
            Reservaties vorige maand
          </h1>
          {/*<Link href={"/dashboard/analyses/weekPDF"}
                className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2")}><Printer
              size={16}/>Afdrukken</Link>*/}
        </div>
        <ReservationsTable reservations={reservationsPreviousMonth} />
      </div>
    </main>
  );
}
