"use client";

import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import type { Tables } from "@/types/supabase/database";

import Checkbox from "@/components/atoms/Checkbox";

import CategoryCell from "../_tableCells/category";
import { getProductById } from "./actions";

interface Props {
    id: string;
    initialData?: Tables<"products">;
}
const CurrentState = ({ id, initialData }: Props) => {
    const {
        data: product,
        isPending,
        isRefetching,
    } = useQuery({
        initialData,
        networkMode: "online",
        queryFn: () => getProductById(id),
        queryKey: ["product", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    return (
        <>
            {isPending && <SpinnerBallIcon className="size-4 animate-spin" />}
            {!isPending && !product && <span>Hall not found</span>}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Naam</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : (
                        product?.name
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                    {product?.for_sale ? "Verkoopprijs" : "Verhuurprijs"}
                </span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : (
                        product?.price
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Categorie</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : (
                        <CategoryCell id={product?.categorie_id || ""} />
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                    <span className="text-sm flex flex-row gap-2 shrink-0">
                        {isRefetching ? (
                            <SpinnerBallIcon className="size-4 animate-spin" />
                        ) : (
                            <Checkbox
                                checked={product?.for_sale ?? false}
                                contentEditable={false}
                                disabled={isRefetching}
                            />
                        )}
                        Te koop
                    </span>
                </span>
            </div>
        </>
    );
};

export default CurrentState;
