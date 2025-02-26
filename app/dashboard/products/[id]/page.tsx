import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms/card";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import { getProductById } from "./actions";
import CurrentState from "./currentState";
import UpdateProductForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/dashboard/products/",
    },
    title: "Producten",
};

export const dynamic = "force-dynamic";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await getProductById(id);

    return (
        <div className="flex flex-row gap-2 h-full">
            <Card>
                <CardHeader>
                    <CardTitle>Huidige versie</CardTitle>
                    <CardDescription>
                        Dit is de huidige versie van het product.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <CurrentState id={id} initialData={product} />
                </CardContent>
                <CardFooter>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href="/dashboard/products"
                    >
                        Terug
                    </Link>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Product aanpassen</CardTitle>
                    <CardDescription>
                        Vul de nieuwe gegevens van deze zaal in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateProductForm id={id} initialData={product} />
                </CardContent>
            </Card>
        </div>
    );
}
