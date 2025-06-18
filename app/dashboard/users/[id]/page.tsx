import type { NextPage } from "next";

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

import { getUserById } from "./actions";
import CurrentState from "./currentState";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ id: string }>;
}
const Page: NextPage<PageProps> = async ({ params }: PageProps) => {
    const { id } = await params;
    const user = await getUserById(id);

    return (
        <div className="flex flex-row gap-2 h-fit pb-2">
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
                    {/* <UpdateCategoryForm id={id} initialData={reservation} /> */}
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
