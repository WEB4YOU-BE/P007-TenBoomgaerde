import {Badge} from "@/components/ui/Badge";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/Hover-card";

interface reservationProps {
    resnumber: String,
    name: String,
    date: Date,
    room: String,
    tel: String,
    code: String,
    state: String
}

const Reservation = async (reservation: reservationProps) => {

    function formatDate(date: Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    return <div className={"p-4 mb-4 border border-gray-200 rounded-lg shadow-sm"}>
        <div className={"grid gap-4 grid-cols-3 grid-rows-4"}>
            <div className={"font-bold text-xl row-start-1 col-span-2"}>
                Reservatienummer: <span>{reservation.resnumber}</span>
            </div>
            <span className={"flex justify-end text-sm"}>
                {(reservation.state === 'success') && <Badge variant={"success"}>Bevestigd</Badge>}
                {(reservation.state === 'denied') && <Badge variant={"denied"}>Geweigerd</Badge>}
                {(reservation.state === 'hold') && <Badge variant={"hold"}>In afwachting</Badge>}
            </span>
            <div className={"sm:row-start-2 col-span-3 sm:col-span-2"}>
                <span className={"font-bold"}>Reserveerder: </span>
                <span>{reservation.name}</span>
            </div>
            <div className={"sm:row-start-3 col-span-3 sm:col-span-2"}>
                <span className={"font-bold"}>Datum: </span>
                <span>{formatDate(reservation.date)}</span>
            </div>
            <div className={"sm:row-start-4 col-span-3 sm:col-span-2"}>
                <span className={"font-bold"}>Zaal: </span>
                <span>{reservation.room}</span>
            </div>
            <div className={"sm:row-start-3 col-span-3 sm:col-span-1"}>
                <HoverCard>
                    <HoverCardTrigger className={"font-bold"}>GSM'nr voor poort: </HoverCardTrigger>
                    <HoverCardContent>Dit gsm'nr wordt gebruikt om de poort open te bellen.</HoverCardContent>
                </HoverCard>
                <span>{reservation.tel}</span>
            </div>
            <div className={"sm:row-start-4 col-span-3 sm:col-span-1"}>
                <span className={"font-bold"}>Code sleutel: </span>
                {
                    (reservation.code === '') &&
                    <HoverCard>
                        <HoverCardTrigger>Nog niet bekend</HoverCardTrigger>
                        <HoverCardContent>Deze code komt de zondag voor uw reservatie online.</HoverCardContent>
                    </HoverCard>
                }
                {reservation.code}
            </div>
        </div>
    </div>
}

export default Reservation;
