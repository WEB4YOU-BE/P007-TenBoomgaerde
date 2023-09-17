interface RoomRecordIndexProps {
    id: string;
    name?: string;
    isPrivate?: boolean;
    pricePerDay: number | null;
}

export default async function RoomRecordIndex({id, name, isPrivate, pricePerDay}: RoomRecordIndexProps) {
    return <tr className={"m-0 border-t p-0 even:bg-muted shrink-0 truncate"}>
        <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{name}</td>
        <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{isPrivate ? "ja" : "nee"}</td>
        <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>€{pricePerDay}</td>
        <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>Toekomstige acties</td>
    </tr>
}