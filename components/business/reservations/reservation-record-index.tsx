import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Info} from "lucide-react";
import React from "react";
import Link from "next/link";
import {Badge} from "@/components/ui/Badge";

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
    accessCode: number | null;
    status: string | null
}


export default async function ReservationRecordIndex({
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
                                                         status
                                                     }: ReservationRecordIndexProps) {
    return <tr
        className={"hover:bg-muted shrink-0 truncate max-sm:text-sm max-sm:[&>*:nth-child(3)]:hidden max-sm:[&>*:nth-child(4)]:hidden max-sm:[&>*:nth-child(5)]:hidden max-lg:[&>*:nth-child(6)]:hidden max-sm:[&>*:nth-child(7)]:hidden"}>
        <ReservationRecordDatapoint>{reservationYear.substring(0, 4) + '-' + reservationNumber}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{start_date === end_date ? start_date : start_date + " tot " + end_date}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{start_hour.start_hour.substring(0, 5) + "-" + end_hour.end_hour.substring(0, 5)}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{rooms.name}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>
            {(status === 'goedgekeurd') && <Badge variant={"success"}>Bevestigd</Badge>}
            {(status === 'geweigerd') && <Badge variant={"denied"}>Geweigerd</Badge>}
            {(status === 'in afwachting') && <Badge variant={"hold"}>In afwachting</Badge>}
        </ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{users.firstname + " " + users.lastname}</ReservationRecordDatapoint>
        <ReservationRecordDatapoint>{accessCode === null ? 'Onbekend' : accessCode}</ReservationRecordDatapoint>
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
            size={16}/><span>Info</span></Link>
    </div>
}