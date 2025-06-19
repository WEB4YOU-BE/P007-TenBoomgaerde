import { NextPage } from "next";
import Link from "next/link";
import React from "react";

import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import Card from "@/components/atoms/Card/Card";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

import { getTimeslotById } from "./actions";
import CurrentState from "./currentState";
import UpdateTimeslotForm from "./form";

interface PageProps {
    params: Promise<{ id: string }>;
}
const Page: NextPage<PageProps> = async ({ params }: PageProps) => {
    const { id } = await params;
    const timeslot = await getTimeslotById(id);

    return (
        <div className="flex flex-row gap-2 h-full">
            <Card className="grow">
                <CardHeader>
                    <CardTitle>Huidige versie</CardTitle>
                    <CardDescription>
                        Dit is de huidige versie van de tijdsblok.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <CurrentState id={id} initialData={timeslot} />
                </CardContent>
                <CardFooter>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href="/dashboard/timeslots"
                    >
                        Terug
                    </Link>
                </CardFooter>
            </Card>
            <Card className="grow">
                <CardHeader>
                    <CardTitle>Tijdsblok aanpassen</CardTitle>
                    <CardDescription>
                        Vul de nieuwe gegevens van deze tijdsblok in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateTimeslotForm id={id} initialData={timeslot} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
