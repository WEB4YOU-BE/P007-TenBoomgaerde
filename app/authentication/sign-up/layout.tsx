import { ReactNode } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/card";

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Card className="w-[350px] max-w-[100dvw]">
                <CardHeader>
                    <CardTitle>Maak account</CardTitle>
                    <CardDescription>Ga verder met &hellip;</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {children}
                </CardContent>
            </Card>
        </>
    );
}
