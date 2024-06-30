"use client";

import * as React from "react";
import {Calendar} from "@/components/atoms/calendar";
import {nlBE} from "date-fns/locale";

export default function DatePickerSCProxy() {
    return <Calendar
        locale={nlBE}
        showOutsideDays
        mode={"range"}
        numberOfMonths={2}
    />
}