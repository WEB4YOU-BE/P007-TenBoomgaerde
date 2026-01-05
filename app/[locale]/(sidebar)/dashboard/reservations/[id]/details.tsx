"use client";

import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useQuery } from "@tanstack/react-query";
import { format, isSameDay, startOfWeek } from "date-fns";
import { nlBE } from "date-fns/locale";
import React from "react";

import Badge from "@/components/atoms/Badge";
import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Separator from "@/components/atoms/Separator";
import Switch from "@/components/atoms/Switch";
import Textarea from "@/components/atoms/Textarea";
import getReservationById, {
    GetReservationByIdResponse,
} from "@/service/reservations/getReservationById";
import { Enums } from "@/types/supabase/database";
import { BadgeVariantProps } from "@/utils/tailwindcss/variants/badgeVariants";

interface ReservationDetailsProps {
    reservationId: string;
}

const RES_STATUS_TO_BADGE_VARIANT: Record<
    Enums<"reservation_status">,
    BadgeVariantProps["variant"]
> = { ACCEPTED: "default", DECLINED: "destructive", PENDING: "secondary" };

const RES_STATUS_LABEL_NL = {
    ACCEPTED: "Goedgekeurd",
    DECLINED: "Afgewezen",
    PENDING: "In afwachting",
} as const satisfies Record<Enums<"reservation_status">, string>;

interface DetailsContentProps {
    reservation: GetReservationByIdResponse;
}

const DetailsContent = ({ reservation }: DetailsContentProps) => {
    // Format reservation number
    const reservationNumber = reservation.start
        ? `${reservation.start.slice(0, 4)}-${reservation.reservation_number.toString().padStart(4, "0")}`
        : "Geen geldige nummer";

    // Format dates
    const formatDates = () => {
        if (!reservation.start || !reservation.end)
            return "Geen data ingevoerd";
        const startDate = new Date(reservation.start);
        const endDate = new Date(reservation.end);
        return `${format(startDate, "Pp", { locale: nlBE })} tot ${format(endDate, isSameDay(startDate, endDate) ? "p" : "Pp", { locale: nlBE })}`;
    };

    // Format halls
    const hallNames =
        reservation.reservations_halls.length > 0
            ? reservation.reservations_halls.map((h) => h.hall.name).join(", ")
            : "Geen zaal geselecteerd";

    // Format booker info
    const bookerName = reservation.booker
        ? [reservation.booker.firstname, reservation.booker.lastname]
              .filter(Boolean)
              .join(" ")
              .trim() || "-"
        : "Gebruiker reeds verwijderd";

    const bookerEmail = reservation.booker?.email ?? "-";
    const bookerPhone = reservation.booker?.phone ?? "-";

    // Format booker address
    const bookerAddress = reservation.booker
        ? [reservation.booker.address_street, reservation.booker.address_number]
              .filter(Boolean)
              .join(" ")
              .trim() || "-"
        : "-";

    const bookerCity = reservation.booker
        ? [
              reservation.booker.address_postal_code,
              reservation.booker.address_city,
          ]
              .filter(Boolean)
              .join(" ")
              .trim() || "-"
        : "-";

    // Calculate access code visibility
    const getAccessCode = () => {
        if (
            !reservation.access_code ||
            reservation.status !== "ACCEPTED" ||
            !reservation.start
        )
            return "-";
        const startDate = new Date(reservation.start);
        const sundayBefore = startOfWeek(startDate, { weekStartsOn: 0 });
        const now = new Date();
        if (now < sundayBefore) return "-";
        return reservation.access_code.toString().padStart(4, "0");
    };

    // Format invoiced status
    const invoicedText =
        reservation.invoiced === true
            ? "Ja"
            : reservation.invoiced === false
              ? "Nee"
              : "Onbekend";

    return (
        <div className="flex flex-col gap-6">
            {/* Reservation Info Card */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>
                                Reservering {reservationNumber}
                            </CardTitle>
                            <CardDescription>
                                Bekijk de details van deze reservering
                            </CardDescription>
                        </div>
                        <Badge
                            variant={
                                RES_STATUS_TO_BADGE_VARIANT[reservation.status]
                            }
                        >
                            {RES_STATUS_LABEL_NL[reservation.status]}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Reserveringsnummer</Label>
                            <Input readOnly value={reservationNumber} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Data</Label>
                            <Input readOnly value={formatDates()} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Zaal/Zalen</Label>
                            <Input readOnly value={hallNames} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Toegangscode</Label>
                            <Input readOnly value={getAccessCode()} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label>Feest</Label>
                                <p className="text-sm text-muted-foreground">
                                    Is dit een feest reservering?
                                </p>
                            </div>
                            <Switch
                                checked={reservation.is_party ?? false}
                                disabled
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label>Gefactureerd</Label>
                                <p className="text-sm text-muted-foreground">
                                    Is deze reservering gefactureerd?
                                </p>
                            </div>
                            <Input
                                className="w-auto"
                                readOnly
                                value={invoicedText}
                            />
                        </div>
                    </div>

                    {reservation.remarks && (
                        <div className="flex flex-col gap-2">
                            <Label>Opmerkingen</Label>
                            <Textarea
                                className="min-h-25"
                                readOnly
                                value={reservation.remarks}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Booker Info Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Reserveerder</CardTitle>
                    <CardDescription>
                        Contactgegevens van de reserveerder
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Naam</Label>
                            <Input readOnly value={bookerName} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>E-mail</Label>
                            <Input readOnly value={bookerEmail} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Telefoon</Label>
                            <Input readOnly value={bookerPhone} />
                        </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Adres</Label>
                            <Input readOnly value={bookerAddress} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Gemeente</Label>
                            <Input readOnly value={bookerCity} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Organization Info Card */}
            {reservation.organization && (
                <Card>
                    <CardHeader>
                        <CardTitle>Organisatie</CardTitle>
                        <CardDescription>
                            Gegevens van de organisatie
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Naam</Label>
                                <Input
                                    readOnly
                                    value={reservation.organization.name}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>BTW-nummer</Label>
                                <Input
                                    readOnly
                                    value={reservation.organization.vat}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

const ReservationDetails = ({ reservationId }: ReservationDetailsProps) => {
    const { data, error, isLoading } = useQuery({
        queryFn: ({ signal }) =>
            getReservationById({ id: reservationId, signal }),
        queryKey: ["reservation", reservationId],
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <SpinnerBallIcon className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Fout</CardTitle>
                    <CardDescription>
                        Er is een fout opgetreden bij het ophalen van de
                        reservering.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-destructive">
                        {error instanceof Error
                            ? error.message
                            : "Onbekende fout"}
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (!data) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Niet gevonden</CardTitle>
                    <CardDescription>
                        De reservering kon niet worden gevonden.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return <DetailsContent reservation={data} />;
};

export default ReservationDetails;
