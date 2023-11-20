import React from "react";
import SelectStatus from "@/components/business/reservations/select-status";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";
import ChangeFacturatie from "@/components/business/reservations/change-facturatie";

interface ReservationIndexProps {
    id: string;
    reservationYear: string;
    reservationNumber: number | null
    users: { id: string, firstname: string, lastname: string, phone: string, email: string };
    rooms: { name: string };
    start_date: string;
    end_date: string;
    start_hour: { start_hour: string };
    end_hour: { end_hour: string };
    accessCode: number | null;
    status: string | null;
    products: { name: string };
    gefactureerd: boolean;
    organizations: { name: string, btw_number: string };
}

export default async function InfoReservationForm({
                                                      id,
                                                      reservationYear,
                                                      reservationNumber,
                                                      users,
                                                      rooms,
                                                      start_date,
                                                      end_date,
                                                      start_hour,
                                                      end_hour,
                                                      accessCode,
                                                      status,
                                                      products,
                                                      gefactureerd,
                                                      organizations
                                                  }: ReservationIndexProps) {
    return <main>
        <div className={"grid grid-cols-1 lg:grid-cols-2 p-2 gap-6"}>
            <div className={"lg:col-span-2"}>
                <div className={"flex flex-col-reverse lg:flex-row gap-4 lg:mb-4 justify-between"}>
                    <div className={"pt-2"}>
                        <span className={"font-bold uppercase"}>Reservatienummer: </span>
                        <span>{reservationYear.substring(0, 4) + '-' + reservationNumber}</span>
                    </div>
                    <div className={"ml-auto flex flex-col gap-4"}>
                        <SelectStatus id={id} status={status}/>
                        <div className={"flex flex-row gap-4"}>
                            <span>Gefactureerd</span>
                            <ChangeFacturatie id={id} isGefactureerd={gefactureerd}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Startdatum:</span>
                <span>{start_date}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Einddatum:</span>
                <span>{end_date}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Startuur:</span>
                <span>{start_hour.start_hour.substring(0, 5)}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Einduur:</span>
                <span>{end_hour.end_hour.substring(0, 5)}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Zaal:</span>
                <span>{rooms.name}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Code:</span>
                {accessCode === null ? 'Onbekend' : accessCode}
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Voornaam:</span>
                <span>{users.firstname}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Achternaam:</span>
                <span>{users.lastname}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Telefoonnummer:</span>
                <span>{users.phone}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Email:</span>
                <span>{users.email}</span>
            </div>
            <div className={"flex flex-row gap-4"}>
                <span className={"font-bold uppercase"}>Producten:</span>
                <span>{products === null ? "" : products.name}</span>
            </div>
            {organizations !== undefined && organizations !== null && (
                <div className="flex flex-col gap-4 border rounded-xl p-4">
                    <h3 className="font-bold uppercase text-xl">Organisatie</h3>
                    <div className={"flex flex-row gap-4"}>
                        <span className="font-bold uppercase">Naam:</span>
                        <span>{organizations.name}</span>
                    </div>
                    <div className={"flex flex-row gap-4"}>
                        <span className="font-bold uppercase">BTW-nummer:</span>
                        <span>{organizations.btw_number}</span>
                    </div>
                </div>
            )}
        </div>
        <Link href={"/dashboard/reservaties"} className={cn(buttonVariants({variant: "green"}), "mt-12")}>Terug naar
            reservatielijst</Link>
    </main>

}