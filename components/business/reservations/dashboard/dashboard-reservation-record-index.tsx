import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
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
                                                                      end_hour
                                                                  }: ReservationRecordIndexProps) {
    const voornaam = users.firstname ?? ""
    const familienaam = users.lastname ?? ""

    return <tr className={"hover:bg-muted shrink-0 truncate"}>
        <ReservationRecordDatapoint>{reservationYear.substring(0, 4) + '-' + reservationNumber}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{start_date === end_date ? start_date : start_date + " tot " + end_date}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{start_hour.start_hour.substring(0, 5) + "-" + end_hour.end_hour.substring(0, 5)}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{rooms.name}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{voornaam + " " + familienaam}</ReservationRecordDatapoint>
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
            size={16}/><span>Bekijk</span></Link>
    </div>
}