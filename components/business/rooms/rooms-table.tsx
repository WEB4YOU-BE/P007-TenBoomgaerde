import RoomRecordIndex from "@/components/business/rooms/room-record-index";
import {Tables} from "@/lib/database.types";

interface RoomsTableProps {
    rooms: Tables<"rooms">[];
}

export default async function RoomsTable({rooms}: RoomsTableProps) {
    return <table className={"w-full"}>
        <thead>
        <tr className={"m-0 border-t p-0 even:bg-muted"}>
            {
                ["Naam", "Is privé", "Prijs", "Acties"]
                    .map((title, index) => <th key={index} className={"px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"}>{title}</th>)
            }
        </tr>
        </thead>
        <tbody>
        {
            rooms
                .map((room, index) =>
                    <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
        }
        </tbody>
    </table>
}