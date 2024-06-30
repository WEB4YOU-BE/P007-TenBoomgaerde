import {buttonVariants} from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/MergeCN";
import {Info} from "lucide-react";
import React from "react";
import Link from "next/link";

interface ReservationRecordIndexProps {
    id: string;
    reservationYear: string;
    reservationNumber: number | null
    users: { id: string, firstname: string, lastname: string };
    rooms: { name: string };
    start_date: string;
    end_date: string;
    start_hour: { start_hour: string };
    end_hour: { end_hour: string };
    organizations: { name: string };
}


export default async function DashboardReservationRecordIndex({
                                                                  id,
                                                                  reservationYear,
                                                                  reservationNumber,
                                                                  users,
                                                                  rooms,
                                                                  start_date,
                                                                  end_date,
                                                                  start_hour,
                                                                  end_hour,
                                                                  organizations
                                                              }: ReservationRecordIndexProps) {
    const voornaam = users.firstname ?? ""
    const familienaam = users.lastname ?? ""

    return <tr
        className={"hover:bg-muted shrink-0 truncate max-sm:[&>*:nth-child(2)]:hidden max-sm:[&>*:nth-child(3)]:hidden max-sm:[&>*:nth-child(4)]:hidden max-sm:[&>*:nth-child(5)]:hidden"}>
        <ReservationRecordDatapoint>{reservationYear.substring(0, 4) + '-' + reservationNumber}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{start_date === end_date ? new Date(start_date).toLocaleDateString('nl-NL', {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }) : new Date(start_date).toLocaleDateString('nl-NL', {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }) + " tot " + new Date(end_date).toLocaleString('nl-NL', {
            day: "2-digit",
            month: "2-digit"
        })}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{start_hour.start_hour.substring(0, 5) + "-" + end_hour.end_hour.substring(0, 5)}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{rooms.name}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{voornaam + " " + familienaam}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{organizations === undefined || organizations === null ? "" : organizations.name}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint><ReservationRecordIndexActions id={id}/></ReservationRecordDatapoint>
    </tr>
}

interface ReservationRecordDatapointProps {
    children?: React.ReactNode;
}

async function ReservationRecordDatapoint({children}: ReservationRecordDatapointProps) {
    return <td
        className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{children}</td>
}

interface ReservationRecordIndexActionsProps {
    id: string;
}

async function ReservationRecordIndexActions({id}: ReservationRecordIndexActionsProps) {
    return <div className={"flex flex-row gap-2 flex-shrink-0"}>
        <Link href={`/dashboard/reservaties/${id}`}
              className={cn(buttonVariants({variant: "blue"}), "flex flex-row gap-2 flex-shrink-0")}><Info
            size={16}/></Link>
    </div>
}