"use client"
import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import {cn} from "@/lib/utils";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useState} from "react";

dayjs.extend(isoWeek)
dayjs.extend(weekOfYear)
export const generateDate = (week = dayjs().isoWeek(), month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfWeek = dayjs().year(year).week(week).startOf("week");
    const lastDateOfWeek = dayjs().year(year).isoWeek(week).endOf("week");


    const arrayOfWeek = [];

    // create prefix date
    for (let i = 0; i < firstDateOfWeek.day(); i++) {

        const date = firstDateOfWeek.day(i);

        arrayOfWeek.push({
            currentWeek: false,
            date,
        });
    }

    // generate current date
    for (let i = firstDateOfWeek.date() + 1; i <= lastDateOfWeek.date() + 1; i++) {
        arrayOfWeek.push({
            currentWeek: true,
            date: firstDateOfWeek.date(i),
            today:
                firstDateOfWeek.date(i).toDate().toDateString() ===
                dayjs().toDate().toDateString(),
        });
    }

    const remaining = 7 - arrayOfWeek.length;

    for (
        let i = lastDateOfWeek.date() + 1;
        i <= lastDateOfWeek.date() + remaining;
        i++
    ) {
        arrayOfWeek.push({
            currentWeek: false,
            date: lastDateOfWeek.date(i),
        });
    }

    return arrayOfWeek;
}

export default function WeekCalendar() {

    const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"]
    const months = [
        "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"
    ]
    const hours = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "21:00", "22:00", "23:00"]
    const currentDate = dayjs()
    const [today, setToday] = useState(currentDate)

    return <div className={"border rounded-2xl p-4 m-4"}>
        <div className={"flex justify-between"}>
            <h1 className={"font-bold"}>{months[today.month()]} {today.year()}</h1>
            <div className={"flex items-center gap-5"}>
                <button onClick={() => {
                    setToday(today.isoWeek(today.isoWeek() - 1))
                }}><ChevronLeft className={"h-5 w-5"}/></button>
                <button onClick={() => {
                    setToday(currentDate)
                }}>Vandaag
                </button>
                <button onClick={() => {
                    setToday(today.isoWeek(today.isoWeek() + 1))
                }}><ChevronRight className={"h-5 w-5"}/></button>
            </div>
        </div>
        <div className={"flex flex-row border mt-8"}>
            <div className={"w-14"}/>
            <div className={"grid grid-cols-7 flex-auto"}>
                {days.map((day, index) => {
                    return <h1 key={index}
                               className={"grid place-content-center text-sm border-x p-2"}>{day}</h1>
                })}
                {generateDate(today.week(), today.month(), today.year()).map(({date, currentWeek, today}, index) => {
                    return <div key={index} className={"grid  place-content-center text-sm pb-2 border-x"}>
                        <span
                            className={cn(currentWeek ? "" : "text-gray-400", date < currentDate ? "text-gray-400 cursor-text" : "", today ? "text-green-500" : "", "grid place-content-center transition-all")}>
                            {date.date()}
                        </span>
                    </div>
                })}
            </div>
        </div>
        <div className={"flex"}>
            <div className={"flex flex-col w-14 justify-items-center border-x"}>
                {
                    hours.map((hour, index) => {
                        return <span key={index} className={"h-12 border-b grid place-content-center"}>{hour}</span>
                    })
                }
            </div>
        </div>
    </div>
}