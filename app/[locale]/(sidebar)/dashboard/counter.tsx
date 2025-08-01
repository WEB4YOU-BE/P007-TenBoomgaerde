"use client";

import { useQuery } from "@tanstack/react-query";
import React, { type CustomComponentPropsWithRef, type FC } from "react";

import Card, {
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";

interface CounterCardProps extends CustomComponentPropsWithRef<typeof Card> {
    cardTitle: string;
    queryFn: (props: { signal: AbortSignal }) => Promise<number>;
}

const CounterCard: FC<CounterCardProps> = ({ cardTitle, queryFn }) => {
    const { data, error, isLoading } = useQuery({
        queryFn,
        queryKey: ["counter", cardTitle],
    });

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{cardTitle}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {isLoading ? "..." : error ? "-" : data}
                </CardTitle>
            </CardHeader>
        </Card>
    );
};

export default CounterCard;
