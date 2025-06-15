import React from "react";

import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Card className="w-[350px] max-w-[100dvw]">
                <CardHeader>
                    <CardTitle>Log uit</CardTitle>
                    <CardDescription>
                        Jammer dat je gaat&hellip;
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {children}
                </CardContent>
            </Card>
        </>
    );
}
