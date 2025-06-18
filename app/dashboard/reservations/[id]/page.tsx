import Link from "next/link";
import React from "react";

import Card, {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

import { getReservationById } from "./actions";
import CurrentState from "./currentState";
import UpdateCategoryForm from "./form";

export const dynamic = "force-dynamic";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const reservation = await getReservationById(id);

    return (
        <div className="flex flex-row gap-2 min-h-full pb-2">
            <Card className="grow">
                <CardHeader>
                    <CardTitle>Huidige versie</CardTitle>
                    <CardDescription>
                        Dit is de huidige versie van de reservatie.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <CurrentState id={id} initialData={reservation} />
                </CardContent>
                <CardFooter>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href="/dashboard/reservations"
                    >
                        Terug
                    </Link>
                </CardFooter>
            </Card>
            <Card className="grow">
                <CardHeader>
                    <CardTitle>Reservering aanpassen</CardTitle>
                    <CardDescription>
                        Vul de nieuwe gegevens van deze zaal in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateCategoryForm id={id} initialData={reservation} />
                </CardContent>
            </Card>
        </div>
    );
}
