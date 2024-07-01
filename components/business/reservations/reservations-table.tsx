import ReservationRecordIndex from "@/components/business/reservations/reservation-record-index";
import { Tables } from "@/types/supabase/database.types";

interface ReservationsTableProps {
  reservations: Tables<"reservations">[];
}

export default async function ReservationsTable({
  reservations,
}: ReservationsTableProps) {
  return (
    <div
      className={"max-w-[100dvw] overflow-x-auto md:max-w-[calc(100dvw-320px)]"}
    >
      <table
        className={"min-w-full table-fixed divide-y divide-gray-200 text-xs"}
      >
        <thead>
          <tr
            className={
              "bg-muted lg:table-row max-sm:[&>*:nth-child(3)]:hidden max-sm:[&>*:nth-child(4)]:hidden max-sm:[&>*:nth-child(5)]:hidden max-lg:[&>*:nth-child(6)]:hidden max-sm:[&>*:nth-child(7)]:hidden max-sm:[&>*:nth-child(8)]:hidden max-sm:[&>*:nth-child(9)]:hidden"
            }
          >
            {[
              "Res-nr",
              "Datum(s)",
              "Uur",
              "Zaal",
              "Status",
              "Reserveerder",
              "Organisatie",
              "Code",
              "Gefactureerd",
              "Acties",
            ].map((title, index) => (
              <th
                key={index}
                scope={"col"}
                className={
                  "shrink-0 truncate px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right"
                }
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={"divide-y divide-muted"}>
          {reservations.map((reservation, index) => (
            <ReservationRecordIndex
              key={index}
              id={reservation.id}
              reservationYear={reservation.reservation_year}
              reservationNumber={reservation.reservation_number}
              users={reservation.user_id}
              rooms={reservation.rooms}
              start_date={reservation.start_date}
              end_date={reservation.end_date}
              start_hour={reservation.start_hour}
              end_hour={reservation.end_hour}
              accessCode={reservation.access_code}
              status={reservation.status}
              gefactureerd={reservation.gefactureerd}
              organizations={reservation.organizations}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
