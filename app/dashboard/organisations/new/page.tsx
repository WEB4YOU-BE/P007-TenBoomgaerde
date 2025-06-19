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

import CreateCategoryForm from "./form";

export const metadata: Metadata = {
    title: "Nieuwe organisatie",
};

export const dynamic = "force-dynamic";

const Page = () => (
    <div className="flex flex-row gap-2 h-full">
        <Card>
            <CardHeader>
                <CardTitle>Organisatie toevoegen</CardTitle>
                <CardDescription>
                    Vul de nieuwe gegevens van deze organisatie in.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateCategoryForm />
            </CardContent>
            <CardFooter>
                <Link
                    className={buttonVariants({ variant: "outline" })}
                    href="/dashboard/organisations"
                >
                    Terug
                </Link>
            </CardFooter>
        </Card>
    </div>
);

export default Page;
