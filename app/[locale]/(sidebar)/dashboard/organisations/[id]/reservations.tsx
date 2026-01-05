"use client";

import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useQuery } from "@tanstack/react-query";
import { format, isSameDay } from "date-fns";
import { nlBE } from "date-fns/locale";
import React, { useCallback } from "react";

import Badge from "@/components/atoms/Badge";
import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/atoms/Table";
import { Link } from "@/i18n/navigation";
import getReservationsForOrganisationAdmin, {
    GetReservationsForOrganisationAdminResponse,
} from "@/service/organisations/getReservationsForOrganisationAdmin";
import { Enums } from "@/types/supabase/database";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { BadgeVariantProps } from "@/utils/tailwindcss/variants/badgeVariants";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

const RES_STATUS_TO_BADGE_VARIANT: Record<
    Enums<"reservation_status">,
    BadgeVariantProps["variant"]
> = { ACCEPTED: "default", DECLINED: "destructive", PENDING: "secondary" };

const RES_STATUS_LABEL_NL: Record<Enums<"reservation_status">, string> = {
    ACCEPTED: "Goedgekeurd",
    DECLINED: "Afgewezen",
    PENDING: "In afwachting",
};

interface ReservationsSectionProps {
    organisationId: string;
}

const ReservationsSection = ({ organisationId }: ReservationsSectionProps) => {
    const queryFn = useCallback(
        ({ signal }: { signal: AbortSignal }) =>
            getReservationsForOrganisationAdmin({ organisationId, signal }),
        [organisationId]
    );

    const { data: reservations, isLoading } =
        useQuery<GetReservationsForOrganisationAdminResponse>({
            queryFn,
            queryKey: ["organisationReservations", organisationId],
        });

    const formatDates = (start: string | null, end: string | null) => {
        if (!start || !end) return "Geen data ingevoerd";
        const startDate = new Date(start);
        const endDate = new Date(end);
        return `${format(startDate, "Pp", { locale: nlBE })} tot ${format(endDate, isSameDay(startDate, endDate) ? "p" : "Pp", { locale: nlBE })}`;
    };

    const formatReservationNumber = (
        start: string | null,
        reservationNumber: number
    ) => {
        if (start) {
            return `${start.slice(0, 4)}-${reservationNumber.toString().padStart(4, "0")}`;
        }
        return "Geen geldige nummer";
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reserveringen</CardTitle>
                <CardDescription>
                    Alle reserveringen van deze organisatie
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <SpinnerBallIcon className="size-8 animate-spin" />
                    </div>
                ) : !reservations || reservations.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                        Geen reserveringen gevonden
                    </p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>RES-NR</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Zaal</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Reserveerder</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reservations.map((reservation) => (
                                <TableRow key={reservation.id}>
                                    <TableCell className="font-mono">
                                        {formatReservationNumber(
                                            reservation.start,
                                            reservation.reservation_number
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {formatDates(
                                            reservation.start,
                                            reservation.end
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {reservation.reservations_halls.length >
                                        0
                                            ? reservation.reservations_halls
                                                  .map((h) => h.hall.name)
                                                  .join(", ")
                                            : "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                RES_STATUS_TO_BADGE_VARIANT[
                                                    reservation.status
                                                ]
                                            }
                                        >
                                            {
                                                RES_STATUS_LABEL_NL[
                                                    reservation.status
                                                ]
                                            }
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {reservation.booker
                                            ? [
                                                  reservation.booker.firstname,
                                                  reservation.booker.lastname,
                                              ]
                                                  .filter(Boolean)
                                                  .join(" ")
                                                  .trim() || "-"
                                            : "Verwijderd"}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            className={cn(
                                                buttonVariants({
                                                    size: "sm",
                                                    variant: "outline",
                                                })
                                            )}
                                            href={`/dashboard/reservations/${reservation.id}`}
                                        >
                                            Bekijken
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};

export default ReservationsSection;
