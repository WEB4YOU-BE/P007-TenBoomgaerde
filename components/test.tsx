"use client"

import {Calendar} from "@/components/ui/calendar";
import {useState} from "react";
import {nlBE} from "date-fns/locale";

export default function Test() {
    const today = new Date()
    const [selected, setSelected] = useState<Date | undefined>(today)

    return <div>
        <Calendar
            required
            mode={"single"}
            selected={selected}
            onSelect={setSelected}
            fromDate={today}
            fixedWeeks
            locale={nlBE}
        />
    </div>
}