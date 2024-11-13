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

import CreateCategoryForm from "./form";

export const metadata: Metadata = {
    title: "Nieuwe zaal",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    return (
        <div className="flex flex-row gap-2 h-full">
            <Card>
                <CardHeader>
                    <CardTitle>Zaal toevoegen</CardTitle>
                    <CardDescription>
                        Vul de nieuwe gegevens van deze zaal in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateCategoryForm />
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
        </div>
    );
}
