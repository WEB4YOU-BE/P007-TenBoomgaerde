"use client"
import dayjs from "dayjs";
import {cn} from "@/lib/utils";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useState} from "react";
import {buttonVariants} from "@/components/ui/button";

export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    // create prefix date
    for (let i = 1; i < firstDateOfMonth.day(); i++) {
        const date = firstDateOfMonth.day(i);

        arrayOfDate.push({
            currentMonth: false,
            date,
        });
    }

    // generate current date
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            today:
                firstDateOfMonth.date(i).toDate().toDateString() ===
                dayjs().toDate().toDateString(),
        });
    }

    const remaining = 42 - arrayOfDate.length;

    for (
        let i = lastDateOfMonth.date() + 1;
        i <= lastDateOfMonth.date() + remaining;
        i++
    ) {
        arrayOfDate.push({
            currentMonth: false,
            date: lastDateOfMonth.date(i),
        });
    }
    return arrayOfDate;
}

export default function Calendar() {
    const days = ["M", "D", "W", "D", "V", "Z", "Z"]
    const months = [
        "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"
    ]
    const currentDate = dayjs()
    const [today, setToday] = useState(currentDate)

    const [selectDate, setSelectDate] = useState(currentDate)

    return <div
        className={"flex flex-col md:flex-row md:divide-x-2 divide-y-2 md:divide-y-0 gap-10 h-screen items-center md:items-start justify-center"}>
        <div className={"w-96 h-96"}>
            <div className={"flex justify-between"}>
                <h1 className={"font-bold"}>{months[today.month()]}, {today.year()}</h1>
                <div className={"flex items-center gap-5"}>
                    <button onClick={() => {
                        setToday(today.month(today.month() - 1))
                    }}><ChevronLeft className={"h-5 w-5"}/></button>
                    <button onClick={() => {
                        setToday(currentDate)
                    }}>Vandaag
                    </button>
                    <button onClick={() => {
                        setToday(today.month(today.month() + 1))
                    }}><ChevronRight className={"h-5 w-5"}/></button>
                </div>
            </div>
            <div className={"grid grid-cols-7 text-gray-500"}>
                {days.map((day, index) => {
                    return <h1 key={index} className={"h-14 grid place-content-center text-sm"}>{day}</h1>
                })}
            </div>
            <div className={"w-full grid grid-cols-7"}>
                {generateDate(today.month(), today.year()).map(({date, currentMonth, today}, index) => {
                    return <div key={index} className={"h-14 border-t grid place-content-center text-sm"}>
                        <button
                            className={cn(currentMonth ? "" : "text-gray-400", date < currentDate ? "text-gray-400 cursor-text" : "hover:bg-green-300", today ? "text-green-500" : "", selectDate === date ? "bg-green-200" : "", "h-10 w-10 grid place-content-center rounded-full transition-all")}
                            onClick={() => {
                                if (date >= currentDate) setSelectDate(date)
                            }}>
                            {date.date()}
                        </button>
                    </div>
                })}
            </div>
        </div>
        <div className={"h-96 w-96 p-5 block"}>
            <h1>Beschikbaarheden voor {selectDate.date()} {months[selectDate.month()]} {selectDate.year()}</h1>
            <div className={"flex flex-col mt-10 items-center gap-6"}>
                <button className={cn(buttonVariants({variant: "green"}), "rounded-full")}>Volledige dag</button>
                <button className={cn(buttonVariants({variant: "green"}), "rounded-full")}>08:00 - 12:00</button>
                <button className={cn(buttonVariants({variant: "green"}), "rounded-full")}>13:00 - 17:00</button>
                <button className={cn(buttonVariants({variant: "green"}), "rounded-full")}>18:00 - 23:00</button>
            </div>
        </div>
    </div>
}