import {Badge} from "@/components/ui/Badge";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/Hover-card";

interface reservationProps {
    id: string;
    reservation_year: string;
    reservation_number: number
    users: { id: string, firstname: string, lastname: string, phone: string };
    rooms: { name: string };
    start_date: string;
    end_date: string;
    start_hour: { start_hour: string };
    end_hour: { end_hour: string };
    products: { name: string };
    access_code: number | null;
    status: string | null;
}

const Reservation = async (reservation: reservationProps) => {

    const voornaam = reservation.users.firstname ?? ""
    const familienaam = reservation.users.lastname ?? ""

    return <div className={"p-4 my-4 border border-gray-200 rounded-lg shadow-sm"}>
        <div className={"grid gap-4 grid-cols-3 grid-rows-4"}>
            <div className={"font-bold text-xl row-start-1 col-span-2"}>
                Reservatienummer: <span>{reservation.reservation_year.substring(0, 4) + '-' + reservation.reservation_number}</span>
            </div>
            <span className={"flex justify-end text-sm text-center"}>
                {(reservation.status === 'goedgekeurd') && <Badge variant={"success"}>Bevestigd</Badge>}
                {(reservation.status === 'geweigerd') && <Badge variant={"denied"}>Geweigerd</Badge>}
                {(reservation.status === 'in afwachting') && <Badge variant={"hold"}>In afwachting</Badge>}
            </span>
            <div className={"sm:row-start-2 col-span-3 sm:col-span-2"}>
                <span className={"font-bold"}>Reserveerder: </span>
                <span>{voornaam + " " + familienaam}</span>
            </div>
            <div className={"sm:row-start-3 col-span-3 sm:col-span-2"}>
                <span className={"font-bold"}>Uur: </span>
                <span>{reservation.start_hour.start_hour.substring(0, 5) + "-" + reservation.end_hour.end_hour.substring(0, 5)}</span>
            </div>
            <div className={"sm:row-start-4 col-span-3 sm:col-span-2"}>
                <span className={"font-bold"}>Datum: </span>
                <span>{reservation.start_date === reservation.end_date ? reservation.start_date : reservation.start_date + " tot " + reservation.end_date}</span>
            </div>
            <div className={"sm:row-start-5 col-span-3 sm:col-span-2"}>
                <span className={"font-bold"}>Zaal: </span>
                <span>{reservation.rooms.name}</span>
            </div>
            <div className={"sm:row-start-4 col-span-3 sm:col-span-1"}>
                <HoverCard>
                    <HoverCardTrigger className={"font-bold"}>GSM&apos;nr voor poort: </HoverCardTrigger>
                    <HoverCardContent>Dit GSM&apos;nr wordt gebruikt om de poort open te bellen.</HoverCardContent>
                </HoverCard>
                <span>{reservation.users.phone}</span>
            </div>
            <div className={"sm:row-start-5 col-span-3 sm:col-span-1"}>
                <span className={"font-bold"}>Code sleutel: </span>
                {
                    (reservation.access_code === null) &&
                    <HoverCard>
                        <HoverCardTrigger>Nog niet bekend</HoverCardTrigger>
                        <HoverCardContent>Deze code komt de zondag voor uw reservatie online.</HoverCardContent>
                    </HoverCard>
                }
                {reservation.access_code}
            </div>
        </div>
    </div>
}

export default Reservation;
