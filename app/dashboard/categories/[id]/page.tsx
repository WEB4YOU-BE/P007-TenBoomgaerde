import Card, {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import { getCategoryById } from "./actions";
import CurrentState from "./currentState";
import UpdateCategoryForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/categories/",
    },
    title: "Categorieën",
};

export const dynamic = "force-dynamic";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const category = await getCategoryById(id);

    return (
        <div className="flex flex-row gap-2 h-full">
            <Card>
                <CardHeader>
                    <CardTitle>Huidige versie</CardTitle>
                    <CardDescription>
                        Dit is de huidige versie van de categorie.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <CurrentState id={id} initialData={category} />
                </CardContent>
                <CardFooter>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href="/dashboard/categories"
                    >
                        Terug
                    </Link>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Categorie aanpassen</CardTitle>
                    <CardDescription>
                        Vul de nieuwe gegevens van deze categorie in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateCategoryForm id={id} initialData={category} />
                </CardContent>
            </Card>
        </div>
    );
}
