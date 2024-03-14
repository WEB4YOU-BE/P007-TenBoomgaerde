import {Tables} from "@/lib/database.types";
import DashboardReservationRecordIndex
    from "@/components/business/reservations/dashboard/dashboard-reservation-record-index";

interface ReservationsTableProps {
    reservations: Tables<"reservations">[]
}

export default async function DashboardReservationRecordTable({reservations}: ReservationsTableProps) {
    return <table className={"min-w-full divide-y divide-gray-200 table-fixed text-xs"}>
        <thead>
        <tr className={"bg-muted max-sm:[&>*:nth-child(2)]:hidden max-sm:[&>*:nth-child(3)]:hidden max-sm:[&>*:nth-child(4)]:hidden max-sm:[&>*:nth-child(5)]:hidden max-sm:[&>*:nth-child(6)]:hidden"}>
            {
                [
                    'Resevatienr',
                    'Datum(s)',
                    'Uur',
                    'Zaal',
                    'Reserveerder',
                    'Organisatie',
                    'Details'
                ].map((th, index) => (
                    <th key={index} scope={"col"}
                        className={"px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>
                        {th}
                    </th>
                ))
            }
        </tr>
        </thead>
        <tbody className={"divide-y divide-muted"}>{
            reservations
                .map((reservation, index) =>
                    <DashboardReservationRecordIndex key={index} id={reservation.id}
                                                     reservationYear={reservation.reservation_year}
                                                     reservationNumber={reservation.reservation_number}
                                                     users={reservation.users} rooms={reservation.rooms}
                                                     start_date={reservation.start_date}
                                                     end_date={reservation.end_date}
                                                     start_hour={reservation.start_hour}
                                                     end_hour={reservation.end_hour}
                                                     organizations={reservation.organizations}/>)
        }</tbody>
    </table>
}