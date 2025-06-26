"use client";

import {
    CheckCircleIcon,
    ClockUserIcon,
    SpinnerBallIcon,
    XCircleIcon,
} from "@phosphor-icons/react/ssr";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React from "react";

import type { Tables } from "@/types/supabase/database";

import {
    getOrganizationById,
    getReservationById,
    getUserById,
} from "./actions";

interface Props {
    id: string;
    initialData?: Tables<"reservations">;
}
const CurrentState = ({ id, initialData }: Props) => {
    const {
        data: reservation,
        isPending,
        isRefetching,
    } = useQuery({
        placeholderData: initialData,
        queryFn: () => getReservationById(id),
        queryKey: ["reservation", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const { data: user, isPending: isPendingUser } = useQuery({
        enabled: !!reservation?.user_id,
        queryFn: () => getUserById(reservation?.user_id || ""),
        queryKey: ["user", reservation?.user_id || ""],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const { data: organization, isPending: isPendingOrganization } = useQuery({
        enabled: !!reservation?.organization_id,
        queryFn: () => getOrganizationById(reservation?.organization_id || ""),
        queryKey: ["organization", reservation?.organization_id || ""],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    return (
        <>
            {isPending && <SpinnerBallIcon className="size-4 animate-spin" />}
            {!isPending && !reservation && <span>Zaal niet gevonden</span>}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Status</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : reservation?.status === "goedgekeurd" ? (
                        <div className="flex items-center gap-2">
                            <CheckCircleIcon color="green" />
                            Goedgekeurd
                        </div>
                    ) : reservation?.status === "in afwachting" ? (
                        <div className="flex items-center gap-2">
                            <ClockUserIcon color="orange" />
                            In afwachting
                        </div>
                    ) : reservation?.status === "geweigerd" ? (
                        <div className="flex items-center gap-2">
                            <XCircleIcon color="red" />
                            Geweigerd
                        </div>
                    ) : (
                        "Onbekend"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Gefactureerd</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : reservation?.gefactureerd ? (
                        "Ja"
                    ) : (
                        "Nee"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Reservatienummer</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : reservation ? (
                        `${reservation.reservation_year.substring(0, 4)}-${reservation.reservation_number}`
                    ) : (
                        "Geen nummer"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                    Startdatum en -tijd
                </span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : reservation?.start ? (
                        format(new Date(reservation.start), "dd-MM-yyyy HH:mm")
                    ) : (
                        "Geen datum/tijd"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                    Einddatum en -tijd
                </span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : reservation?.end ? (
                        format(new Date(reservation.end), "dd-MM-yyyy HH:mm")
                    ) : (
                        "Geen datum/tijd"
                    )}
                </span>
            </div>
            {/* TODO: Add halls */}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Toegangscode</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : (
                        reservation?.access_code || "Geen toegangscode"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Reserveerder</span>
                <span className="text-sm">
                    {isRefetching && isPendingUser ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : user ? (
                        user.firstname && user.lastname ? (
                            `${user.firstname} ${user.lastname}`
                        ) : (
                            "Onbekende gebruiker"
                        )
                    ) : (
                        "Geen reserveerder"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Telefoonnummer</span>
                <span className="text-sm">
                    {isRefetching && isPendingUser ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : (
                        user?.phone || "Geen telefoonnummer"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Email</span>
                <span className="text-sm">
                    {isRefetching && isPendingUser ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : (
                        user?.email || "Geen email"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Adres</span>
                <span className="text-sm">
                    {isRefetching && isPendingUser ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : user ? (
                        `${user.address_street || ""} ${user.address_number || ""}, ${user.address_postal_code || ""} ${user.address_city || ""}`
                    ) : (
                        "Geen adres"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Organisatie</span>
                <span className="text-sm">
                    {isRefetching && isPendingOrganization ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : organization ? (
                        `${organization.name} (BTW: ${organization.btw_number})`
                    ) : (
                        "Geen organisatie"
                    )}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Opmerkingen</span>
                <span className="text-sm">
                    {isRefetching ? (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    ) : (
                        reservation?.remarks || "Geen opmerkingen"
                    )}
                </span>
            </div>
        </>
    );
};

export default CurrentState;
