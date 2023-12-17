"use client"
import {DropdownMenuItem} from "@/components/ui/Dropdown-menu";
import Link from "next/link";

interface RoomRecordIndexProps {
    id: string;
    name: string;
}

export default function SelectCalendarIndex({name, id}: RoomRecordIndexProps) {
    return <Link href={`/reserveren/${id}`}><DropdownMenuItem key={id}>{name}</DropdownMenuItem></Link>
}