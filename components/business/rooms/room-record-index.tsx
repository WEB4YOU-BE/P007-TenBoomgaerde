"use client"
import {buttonVariants} from "@/components/ui/button";
import {Edit, Trash} from "lucide-react";
import {cn} from "@/lib/utils";
import React from "react";
import {Delete} from "@/components/business/delete";
import Link from "next/link";

interface RoomRecordIndexProps {
    id: string;
    name?: string;
    isPrivate?: boolean;
    pricePerBlok: number | null;
    pricePerBlok2: number | null;
    tableName: string;
}

export default async function RoomRecordIndex({
                                                  id,
                                                  name,
                                                  isPrivate,
                                                  pricePerBlok,
                                                  pricePerBlok2,
                                                  tableName
                                              }: RoomRecordIndexProps) {
    return <tr
        className={"hover:bg-muted whitespace-nowrap max-sm:[&>*:nth-child(3)]:hidden max-sm:[&>*:nth-child(4)]:hidden"}>
        <RoomRecordDatapoint>{name}</RoomRecordDatapoint>
        <RoomRecordDatapoint>{isPrivate ? "ja" : "nee"}</RoomRecordDatapoint>
        <RoomRecordDatapoint>&euro;{pricePerBlok}</RoomRecordDatapoint>
        <RoomRecordDatapoint>&euro;{pricePerBlok2}</RoomRecordDatapoint>
        <RoomRecordDatapoint><RoomRecordIndexActions id={id} tableName={tableName}/></RoomRecordDatapoint>
    </tr>
}

interface RoomRecordDatapointProps {
    children?: React.ReactNode;
}

async function RoomRecordDatapoint({children}: RoomRecordDatapointProps) {
    return <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{children}</td>
}

interface RoomRecordIndexActionsProps {
    id: string;
    tableName: string;
}

async function RoomRecordIndexActions({id, tableName}: RoomRecordIndexActionsProps) {
    const handleDelete = async () => {
        await Delete({id, tableName})
    }

    return <div className={"flex flex-row gap-2 flex-shrink-0"}>
        <Link href={`/dashboard/zalen/${id}`}
              className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2 flex-shrink-0")}><Edit
            size={16}/><span className={"max-sm:hidden"}>Bewerk</span></Link>
        <button onClick={handleDelete}
                className={cn(buttonVariants({variant: "destructive"}), "flex flex-row gap-2 flex-shrink-0")}><Trash
            size={16}/><span className={"max-sm:hidden"}>Verwijder</span></button>
    </div>
}