import { Metadata } from "next";
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

import CreateProductForm from "./form";

export const metadata: Metadata = {
    title: "Nieuw product",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    return (
        <div className="flex flex-row gap-2 h-full">
            <Card>
                <CardHeader>
                    <CardTitle>Product toevoegen</CardTitle>
                    <CardDescription>
                        Vul de nieuwe gegevens van dit product in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateProductForm />
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
        </div>
    );
}
