import {Tables} from "@/lib/database.types";
import ReservationRecordIndex from "@/components/business/reservations/reservation-record-index";

interface ReservationsTableProps {
    reservations: Tables<"reservations">[];
}

export default async function ReservationsTable({reservations}: ReservationsTableProps) {
    return <div className={"max-w-[100dvw] md:max-w-[calc(100dvw-320px)] overflow-x-auto"}>
        <table className={"min-w-full divide-y divide-gray-200 table-fixed text-sm"}>
            <thead>
            <tr className={"bg-muted lg:table-row max-sm:[&>*:nth-child(3)]:hidden max-sm:[&>*:nth-child(4)]:hidden max-sm:[&>*:nth-child(5)]:hidden max-lg:[&>*:nth-child(6)]:hidden max-sm:[&>*:nth-child(7)]:hidden max-sm:[&>*:nth-child(8)]:hidden"}>{
                ['Res-nr', 'Datum(s)', 'Uur', 'Zaal', 'Status', 'Reserveerder', 'Code', 'Gefactureerd', 'Acties']
                    .map((title, index) => <th key={index} scope={"col"}
                                               className={" px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>{title}</th>)
            }</tr>
            </thead>
            <tbody className={"divide-y divide-muted"}>{
                reservations
                    .map((reservation, index) =>
                        <ReservationRecordIndex key={index} id={reservation.id}
                                                reservationYear={reservation.reservation_year}
                                                reservationNumber={reservation.reservation_number}
                                                users={reservation.users} rooms={reservation.rooms}
                                                start_date={reservation.start_date} end_date={reservation.end_date}
                                                start_hour={reservation.start_hour} end_hour={reservation.end_hour}
                                                accessCode={reservation.access_code}
                                                status={reservation.status} gefactureerd={reservation.gefactureerd}/>)
            }</tbody>
        </table>
    </div>
}