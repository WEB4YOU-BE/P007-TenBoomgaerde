"use client"
import {SelectItem} from "@/components/ui/Select";

interface RoomRecordIndexProps {
    id: string;
    name: string;
}

export default function SelectCalendarIndex({name}: RoomRecordIndexProps) {
    return <SelectItem value={name} onClick={() => console.log('test')}>{name}</SelectItem>
}