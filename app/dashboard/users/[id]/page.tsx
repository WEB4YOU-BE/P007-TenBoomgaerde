import type { NextPage } from "next";

import Link from "next/link";
import React from "react";

import { columns, DataTable } from "@/app/dashboard/reservations/table";
import UpdateUserForm from "@/app/dashboard/users/[id]/form";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import Card from "@/components/atoms/Card/Card";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

import { getReservationByUserId, getUserById } from "./actions";
import CurrentState from "./currentState";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ id: string }>;
}
const Page: NextPage<PageProps> = async ({ params }: PageProps) => {
    const { id } = await params;
    const user = await getUserById(id);
    const reservations = await getReservationByUserId(id);

    return (
        <div className="flex flex-col gap-2 min-h-full pb-2">
            <div className="flex flex-row gap-2 h-fit">
                <Card className="grow">
                    <CardHeader>
                        <CardTitle>Huidige versie</CardTitle>
                        <CardDescription>
                            Dit is de huidige versie van de gebruiker.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <CurrentState id={id} initialData={user} />
                    </CardContent>
                    <CardFooter>
                        <Link
                            className={buttonVariants({ variant: "outline" })}
                            href="/dashboard/users"
                        >
                            Terug
                        </Link>
                    </CardFooter>
                </Card>
                <Card className="grow">
                    <CardHeader>
                        <CardTitle>Gebruiker aanpassen</CardTitle>
                        <CardDescription>
                            Vul de nieuwe gegevens van deze gebruiker in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdateUserForm id={id} initialData={user} />
                    </CardContent>
                </Card>
            </div>
            <DataTable columns={columns} data={reservations} />
        </div>
    );
};

export default Page;
