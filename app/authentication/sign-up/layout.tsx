import type { NextPage } from "next";

import React from "react";

import type NextLayout from "@/types/next/layout";

import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";

const Layout: NextPage<NextLayout> = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <Card className="w-[350px] max-w-[100dvw]">
        <CardHeader>
            <CardTitle>Maak account</CardTitle>
            <CardDescription>Ga verder met &hellip;</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">{children}</CardContent>
    </Card>
);

export default Layout;
