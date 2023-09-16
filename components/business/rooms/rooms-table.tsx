import RoomRecordIndex from "@/components/business/rooms/room-record-index";
import {Tables} from "@/lib/database.types";

interface RoomsTableProps {
    rooms: Tables<"rooms">[];
}

export default async function RoomsTable({rooms}: RoomsTableProps) {
    return <div className={"max-w-[100dvw] overflow-x-auto"}>
        <table className={"w-full"}>
            <thead className={"sticky top-0"}> {/*TODO fix the not working sticky feature.*/}
            <tr className={"bg-white even:bg-muted"}>
                {
                    ["Naam", "Is privé", "Prijs", "Acties"]
                        .map((title, index) => <th key={index} className={"px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>{title}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            {
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private} pricePerDay={room.day_price}/>)
            }
            </tbody>
        </table>
    </div>
}