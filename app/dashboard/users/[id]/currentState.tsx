"use client";

import { SpinnerBallIcon } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import React, { type FC } from "react";

import type { Tables } from "@/types/supabase/database";

import { getUserById } from "./actions";

interface CurrentStateProps {
    id: string;
    initialData?: Tables<"users">;
}
const CurrentState: FC<CurrentStateProps> = ({ id, initialData }) => {
    const {
        data: user,
        isPending,
        isRefetching,
    } = useQuery({
        initialData,
        queryFn: () => getUserById(id),
        queryKey: ["user", id],
        retry: true,
        staleTime: 1000 * 60 * 1, // 1 minutes
    });

    return (
        <>
            {isPending && <SpinnerBallIcon className="size-4 animate-spin" />}
            {!isPending && !user && <span>Gebruiker niet gevonden</span>}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Naam</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : user ? (
                        `${user.firstname} ${user.lastname}`
                    ) : (
                        "Onbekend"
                    )}
                </span>
            </div>
            {/* GSM, Email, Adres, type klant, isAdmin */}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">GSM</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : user ? (
                        user.phone || "Onbekend"
                    ) : (
                        "Onbekend"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Email</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : user ? (
                        user.email || "Onbekend"
                    ) : (
                        "Onbekend"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Adres</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : user ? (
                        `${user.street}, ${user.postcode} ${user.city}`
                    ) : (
                        "Onbekend"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Type klant</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : user ? (
                        user.type || "Onbekend"
                    ) : (
                        "Onbekend"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Is administrator</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : user ? (
                        user.is_admin ? (
                            "Ja"
                        ) : (
                            "Nee"
                        )
                    ) : (
                        "Onbekend"
                    )}
                </span>
            </div>
        </>
    );
};

export default CurrentState;
