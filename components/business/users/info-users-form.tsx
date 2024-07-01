import { createClient } from "@/utils/supabase/server";
import React from "react";
import ChangeAdmin from "@/components/business/users/change-admin";
import { cn } from "@/utils/tailwindcss/MergeCN";
import { buttonVariants } from "@/components/atoms/button";
import Link from "next/link";
import ReservationsTable from "@/components/business/reservations/reservations-table";

interface UserIndexProps {
  id: string;
}

export default async function InfoUserForm({ id }: UserIndexProps) {
  const supabase = createClient();

  const { data: users } = await supabase.from("users").select().eq("id", id);
  const { data: reservations } = await supabase
    .from("reservations")
    .select(
      `id, reservation_year, reservation_number, users!inner(id, firstname, lastname), rooms(name), start_hour:bloks!start_hour(start_hour), end_hour:bloks!end_hour(end_hour), start_date, end_date, products(name), access_code, status, gefactureerd, organizations(name), remarks`,
    )
    .eq("user.id", id)
    .order("start_date");

  if (!users || !users[0]) return <></>;
  if (!reservations) return <></>;

  const postcode = users[0].postcode ?? "";
  const gemeente = users[0].city ?? "";

  return (
    <div>
      <div className={"grid gap-8 p-2 lg:grid-cols-2"}>
        <div className={"lg:col-span-2"}>
          <div className={"flex flex-row gap-4 lg:mb-16 lg:justify-end"}>
            <div className={"flex flex-row gap-4 lg:ml-auto"}>
              <p className={"font-bold uppercase"}>Administrator?</p>
              <ChangeAdmin
                id={users[0].id}
                isAdmin={users[0].is_admin}
                email={users[0].email}
              />
            </div>
          </div>
        </div>
        <div className={"flex flex-row gap-4"}>
          <span className={"font-bold uppercase"}>Voornaam:</span>
          <span>{users[0].firstname ?? ""}</span>
        </div>
        <div className={"flex flex-row gap-4"}>
          <span className={"font-bold uppercase"}>Familienaam:</span>
          <span>{users[0].lastname ?? ""}</span>
        </div>
        <div className={"flex flex-row gap-4"}>
          <span className={"font-bold uppercase"}>Gsm-nummer:</span>
          <span>{users[0].phone ?? ""}</span>
        </div>
        <div className={"flex flex-row gap-4"}>
          <span className={"font-bold uppercase"}>Emailadres:</span>
          <span>{users[0].email ?? ""}</span>
        </div>
        <div className={"flex flex-row gap-4"}>
          <span className={"font-bold uppercase"}>Adres:</span>
          <span>{users[0].street ?? ""}</span>
        </div>
        <div className={"flex flex-row gap-4"}>
          <span className={"font-bold uppercase"}>Gemeente:</span>
          <span>{postcode + " " + gemeente}</span>
        </div>
        <div className={"flex flex-row gap-4"}>
          <span className={"font-bold uppercase"}>Type klant:</span>
          <span>{users[0].type ?? ""}</span>
        </div>
      </div>
      <Link
        href={"/dashboard/gebruikers"}
        className={cn(buttonVariants({ variant: "secondary" }), "mt-12")}
      >
        Terug naar gebruikerslijst
      </Link>
      <div className={"my-5 rounded-2xl border border-gray-300 p-2"}>
        <div className={"flex flex-col gap-2 p-4 md:flex-row"}>
          <h1 className={"text-3xl font-extrabold tracking-tight md:flex-grow"}>
            Reservaties
          </h1>
        </div>
        {!reservations === undefined || reservations.length === 0 ? (
          <h3 className={"p-4 text-xl"}>
            {users[0].firstname ?? "Deze gebruiker"} heeft geen reservaties
          </h3>
        ) : (
          <ReservationsTable reservations={reservations} />
        )}
      </div>
    </div>
  );
}
