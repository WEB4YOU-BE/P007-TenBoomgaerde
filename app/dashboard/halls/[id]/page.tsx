import { buttonVariants } from "@/components/atoms/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms/card";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import { getHallById } from "./actions";
import CurrentState from "./currentState";
import UpdateCategoryForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/timeslots/",
    },
    title: "Tijdsblokken",
};

export const dynamic = "force-dynamic";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const hall = await getHallById(id);

    return (
        <div className="flex flex-row gap-2 h-full">
            <Card>
                <CardHeader>
                    <CardTitle>Huidige versie</CardTitle>
                    <CardDescription>
                        Dit is de huidige versie van de zaal.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <CurrentState id={id} initialData={hall} />
                </CardContent>
                <CardFooter>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href="/dashboard/halls"
                    >
                        Terug
                    </Link>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Zaal aanpassen</CardTitle>
                    <CardDescription>
                        Vul de nieuwe gegevens van deze zaal in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateCategoryForm id={id} initialData={hall} />
                </CardContent>
            </Card>
        </div>
    );
}
