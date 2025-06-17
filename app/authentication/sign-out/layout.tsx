import type { NextPage } from "next";

import React from "react";

import type NextLayout from "@/types/next/layout";

import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";

const Layout: NextPage<NextLayout> = ({ children }: NextLayout) => {
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
};

export default Layout;
