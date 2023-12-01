"use client"

import {JSX, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {PostgrestSingleResponse, User} from "@supabase/supabase-js";
import {Calendar} from "@/components/ui/calendar";
import {nlBE} from "date-fns/locale";
import {addDays, eachDayOfInterval, formatISO} from "date-fns";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/Popover";

export default function ReservationForm({submit, rooms, timeframes, materials, gebruiker, user, allReservations}: {
    submit: (formData: FormData) => Promise<never>,
    rooms: PostgrestSingleResponse<any[]>,
    timeframes: PostgrestSingleResponse<any[]>,
    materials: PostgrestSingleResponse<any[]>,
    gebruiker: PostgrestSingleResponse<any[]>,
    user: User | null,
    allReservations: PostgrestSingleResponse<any[]>,
}): JSX.Element {
    const today = new Date()

    const [selectedRoom, setSelectedRoom] = useState(undefined)
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [startTimestamp, setStartTimeStamp] = useState(undefined)
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)
    const [endTimestamp, setEndTimestamp] = useState(undefined)

    useEffect(() => {
        console.log(allReservations?.data?.flatMap((reservation) => eachDayOfInterval({start: new Date(reservation.start_date), end: new Date(reservation.end_date)})))
    }, [allReservations])

    const combinedReservationTimestamps = undefined
    const modifiedClassnames = {
        available: "text-green-600 bg-green-100",
        partialyAvailable: "text-amber-600 bg-amber-100",
        notAvailable: "text-red-600 bg-red-100",
    }
    const availableDaysStart: Date[] = []
    const partialyAvailableDaysStart: Date[] = []
    const notAvailableDaysStart = allReservations?.data?.flatMap((reservation) => eachDayOfInterval({start: new Date(reservation.start_date), end: new Date(reservation.end_date)})) || []
    const modifierDaysStart = {
        available: availableDaysStart,
        partialyAvailable: partialyAvailableDaysStart,
        notAvailable: notAvailableDaysStart,
    }
    const availableDaysEnd = [new Date()]
    const partialyAvailableDaysEnd = [addDays(new Date(), 1)]
    const notAvailableDaysEnd = [addDays(new Date(), 2)]
    const modifierDaysEnd = {
        available: availableDaysEnd,
        partialyAvailable: partialyAvailableDaysEnd,
        notAvailable: notAvailableDaysEnd,
    }

    return <div>
        <form id="reservationForm" action={submit}/>
        <h1 className={"text-3xl font-bold"}>Reservatie</h1>
        <div className={"rounded-lg bg-gray-100 shadow-sm p-2 flex flex-col gap-4"}>
            <section>
                <fieldset className={"flex flex-row flex-wrap gap-2"}>
                    <legend className={"text-xl font-semibold"}>Selecteer de zaal</legend>
                    {
                        rooms.data?.map((room) => <div key={room.id} className={"flex-grow"}>
                            <input required form="reservationForm" type="radio" name="room" id={room.id} value={room.id} className={"peer hidden"} onClick={() => {
                                setSelectedRoom(room.id)
                            }}/>
                            <label htmlFor={room.id}
                                   className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400 w-full")}>{room.name}</label>
                        </div>)
                    }
                </fieldset>
            </section>
            <hr/>
            <section className={"flex flex-col flex-wrap gap-2"}>
                <span className={cn((!selectedRoom) ? "block" : "hidden")}>Vervolledig de vorige stap.</span>
                <fieldset className={cn(selectedRoom !== undefined ? "block" : "hidden")}>
                    <legend className={"text-xl font-semibold"}>Selecteer de startmoment</legend>
                    <Popover>
                        <PopoverTrigger asChild>
                            <input required readOnly form="reservationForm" type="date" name="start" value={startDate ? formatISO(startDate, {representation: 'date'}) : undefined}
                                   className={cn(buttonVariants({variant: "outline"}), "w-full")}/>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                required
                                mode={"single"}
                                selected={startDate}
                                onSelect={setStartDate}
                                fromDate={today}
                                fixedWeeks
                                disabled={notAvailableDaysStart}
                                modifiers={modifierDaysStart}
                                modifiersClassNames={modifiedClassnames}
                                locale={nlBE}
                            />
                        </PopoverContent>
                    </Popover>
                </fieldset>
                <fieldset className={cn((!!selectedRoom && !!startDate) ? "flex flex-row flex-wrap gap-2" : "hidden")}>
                    {
                        timeframes.data?.map((timeframe) => <div key={timeframe.id} className={"flex-grow"}>
                            <input required form="reservationForm" type="radio" name="startTimeframe" id={"start-" + timeframe.id} value={timeframe.id} onClick={() => setStartTimeStamp(timeframe.id)}
                                   className={"peer hidden"}/>
                            <label htmlFor={"start-" + timeframe.id}
                                   className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400 w-full")}>{timeframe.name} ({timeframe.start_hour.substring(0, 5)})</label>
                        </div>)
                    }
                </fieldset>
            </section>
            <hr/>
            <section className={"flex flex-col flex-wrap gap-2"}>
                <span className={cn((!selectedRoom || !startDate || !startTimestamp) ? "block" : "hidden")}>Vervolledig de vorige stap(pen).</span>
                <fieldset className={cn((startDate !== undefined && startTimestamp !== undefined) ? "block" : "hidden")}>
                    <legend className={"text-xl font-semibold"}>Selecteer de eindmoment</legend>
                    <Popover>
                        <PopoverTrigger asChild>
                            <input required readOnly form="reservationForm" type="date" name="end" value={endDate ? formatISO(endDate, {representation: 'date'}) : undefined}
                                   className={cn(buttonVariants({variant: "outline"}), "w-full")}/>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                required
                                mode={"single"}
                                selected={endDate}
                                onSelect={setEndDate}
                                fromDate={startDate}
                                fixedWeeks
                                disabled={notAvailableDaysEnd}
                                modifiers={modifierDaysEnd}
                                modifiersClassNames={modifiedClassnames}
                                locale={nlBE}
                            />
                        </PopoverContent>
                    </Popover>
                </fieldset>
                <fieldset className={cn((!!selectedRoom && !!startDate && !!startTimestamp && !!endDate) ? "flex flex-row flex-wrap gap-2" : "hidden")}>
                    {
                        timeframes.data?.map((timeframe) => <div key={timeframe.id} className={"flex-grow"}>
                            <input required form="reservationForm" type="radio" name="endTimeframe" id={"end-" + timeframe.id} value={timeframe.id} className={"peer hidden"}
                                   onClick={() => setEndTimestamp(timeframe.id)}/>
                            <label htmlFor={"end-" + timeframe.id}
                                   className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400 w-full")}>{timeframe.name} ({timeframe.end_hour.substring(0, 5)})</label>
                        </div>)
                    }
                </fieldset>
            </section>
            <hr/>
            <section className={"flex flex-col flex-wrap gap-2"}>
                <span className={cn((!selectedRoom || !startDate || !startTimestamp || !endDate || !endTimestamp) ? "block" : "hidden")}>Vervolledig de vorige stap(pen).</span>
                <fieldset className={cn((!!selectedRoom && !!startDate && !!startTimestamp && !!endDate && !!endTimestamp) ? "flex flex-row flex-wrap gap-2" : "hidden")}>
                    <legend className={"text-xl font-semibold"}>Duid uw extra&apos;s aan</legend>
                    <div className={"flex-grow"}>
                        <input form="reservationForm" type="checkbox" name="material" id={"material-drank"} value={"drank"}
                               className={"peer hidden"}/>
                        <label htmlFor={"material-drank"}
                               className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400 w-full")}>Drank</label>
                    </div>
                    {
                        materials.data?.map((material) => <div key={material.id} className={"flex-grow"}>
                            <input form="reservationForm" type="checkbox" name="material" id={"material-" + material.id} value={material.id} className={"peer hidden"}/>
                            <label htmlFor={"material-" + material.id}
                                   className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-blue-400 w-full")}>{material.name}</label>
                        </div>)
                    }
                </fieldset>
            </section>
            <hr/>
            <section>
                <p>Je bent aangemeld als {gebruiker.data && gebruiker.data[0].firstname}</p>
                <input form="reservationForm" type="text" name="userId" defaultValue={user?.id} readOnly className={"hidden"}/>
            </section>
            <section>
                <button disabled={(!selectedRoom || !startDate || !startTimestamp || !endDate || !endTimestamp)} form={"reservationForm"} className={buttonVariants()}>Reserveer</button>
            </section>
        </div>
    </div>
}