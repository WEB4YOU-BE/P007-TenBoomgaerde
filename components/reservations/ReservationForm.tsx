"use client"

import {JSX, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {PostgrestSingleResponse, User} from "@supabase/supabase-js";
import {Calendar} from "@/components/ui/calendar";
import {nlBE} from "date-fns/locale";
import {addDays, addYears, compareAsc, eachDayOfInterval, formatISO, isAfter, isSameDay} from "date-fns";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/Popover";
import {Tables} from "@/lib/database.types";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/Dialog";

export default function ReservationForm({submit, rooms, timeframes, materials, gebruiker, user, allReservations, organizations}: {
    submit: (formData: FormData) => Promise<never>,
    rooms: PostgrestSingleResponse<Tables<"rooms">[]>,
    timeframes: PostgrestSingleResponse<Tables<"bloks">[]>,
    materials: PostgrestSingleResponse<Tables<"products">[]>,
    gebruiker: PostgrestSingleResponse<Tables<"users">[]>,
    user: User | null,
    allReservations: PostgrestSingleResponse<Tables<"reservations">[]>,
    organizations: PostgrestSingleResponse<Tables<"organizations">[]>,
}): JSX.Element {
    let document = "/documents/Reglement_vergaderzalen_Ten_Boomgaerde_vzw.pdf"
    const today = new Date()
    const fiveYearsFromToday = addYears(today, 5)
    const sortedTimeframes = timeframes.data?.sort((timeframe1, timeframe2) => (timeframe1.start_hour.localeCompare(timeframe2.start_hour))) || []

    const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined)
    const [selectedRoomString, setSelectedRoomString] = useState<string | undefined>(undefined)
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [startTimestamp, setStartTimeStamp] = useState<string | undefined>(undefined)
    const [startTime, setStartTime] = useState<string>()
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)
    const [endTimestamp, setEndTimestamp] = useState<string | undefined>(undefined)
    const [endTime, setEndTime] = useState<string>()
    const [selectedConditions, setSelectedConditions] = useState<boolean>(false)
    const [selectedOrganization, setSelectedOrganization] = useState<string | undefined>(undefined)

    useEffect(() => {
        setStartDate(undefined)
        setStartTimeStamp(undefined)
        setEndDate(undefined)
        setEndTimestamp(undefined)
    }, [selectedRoom])

    useEffect(() => {
        setStartTimeStamp(undefined)
        setEndDate(undefined)
        setEndTimestamp(undefined)
    }, [startDate])

    useEffect(() => {
        setEndDate(undefined)
        setEndTimestamp(undefined)
    }, [startTimestamp])

    useEffect(() => {
        setEndTimestamp(undefined)
    }, [endDate])

    const reservationsInSelectedRoom = allReservations.data
            ?.filter((reservation) => reservation.rooms.id === selectedRoom)
            ?.filter((reservation) => reservation.status !== "geweigerd")
        || []
    const sortedReservationsInSelectedRoom = reservationsInSelectedRoom
        .sort((r1, r2) => compareAsc(new Date(r1.start_date), new Date(r2.start_date)))
    const bookedTimeframeDays = sortedReservationsInSelectedRoom
        .flatMap((reservation) =>
            eachDayOfInterval({start: new Date(reservation.start_date), end: new Date(reservation.end_date)})
                .map((dayInReservation, index) => generateDayInReservation(reservation, index, dayInReservation))
        )

    function generateDayInReservation(reservation: Tables<"reservations">, index: number, day: Date) {
        let dayTF: any[] = []
        if ((formatISO(new Date(reservation.start_date), {representation: 'date'}) === formatISO(day, {representation: 'date'})) && !(formatISO(new Date(reservation.end_date), {representation: 'date'}) === formatISO(day, {representation: 'date'})))
            sortedTimeframes.forEach((tf) => {
                if (tf.start_hour.substring(0, 2) >= reservation.start_hour.start_hour.substring(0, 2)) dayTF.push(tf)
            })
        if (!(formatISO(new Date(reservation.start_date), {representation: 'date'}) === formatISO(day, {representation: 'date'})) && (formatISO(new Date(reservation.end_date), {representation: 'date'}) === formatISO(day, {representation: 'date'})))
            sortedTimeframes.forEach((tf) => {
                if (tf.end_hour.substring(0, 2) <= reservation.end_hour.end_hour.substring(0, 2)) dayTF.push(tf)
            })
        if ((formatISO(new Date(reservation.start_date), {representation: 'date'}) === formatISO(day, {representation: 'date'})) && formatISO(new Date(reservation.end_date), {representation: 'date'}) === formatISO(day, {representation: 'date'}))
            sortedTimeframes.forEach((tf) => {
                if (tf.start_hour.substring(0, 2) >= reservation.start_hour.start_hour.substring(0, 2) && tf.end_hour.substring(0, 2) <= reservation.end_hour.end_hour.substring(0, 2)) dayTF.push(tf)
            })
        if (!((formatISO(new Date(reservation.start_date), {representation: 'date'}) === formatISO(day, {representation: 'date'})) || formatISO(new Date(reservation.end_date), {representation: 'date'}) === formatISO(day, {representation: 'date'})))
            dayTF = sortedTimeframes

        return {
            date: day,
            timeframes: dayTF
        };
    }

    function timeframeDisabledStart(timeframeId: string, day?: Date): boolean {
        if (day === undefined) return false
        return bookedTimeframeDays
            .filter((bookedTFD) => formatISO(bookedTFD.date, {representation: 'date'}) === formatISO(day, {representation: 'date'}))
            .filter((bookedTFD) => bookedTFD.timeframes.map((tf) => tf.id).includes(timeframeId))
            .length > 0
    }

    function findMaxRangeDayIfExists() {
        const bookingsOnOrAfterStartDay = bookedTimeframeDays.filter((bookedTimeframeDays) => isAfter(bookedTimeframeDays.date, startDate || fiveYearsFromToday) || isSameDay(bookedTimeframeDays.date, startDate || fiveYearsFromToday))
        if (bookingsOnOrAfterStartDay.length === 0) return undefined

        if (formatISO(bookingsOnOrAfterStartDay[0].date, {representation: 'date'}) === formatISO(startDate || new Date(), {representation: 'date'}))
            return startDate
        if (formatISO(bookingsOnOrAfterStartDay[0].date, {representation: 'date'}) !== formatISO(startDate || new Date(), {representation: 'date'}))
            return addDays(startDate || new Date(), 1)
    }

    function timeframeDisabledEnd(timeframeId: string, day?: Date): boolean {
        if (day === undefined) return false
        if (formatISO(day, {representation: 'date'}) === formatISO(startDate || new Date(), {representation: 'date'}) && startTimestamp)
            return sortedTimeframes
                .map((timeframe) => timeframe.id)
                .indexOf(timeframeId) < sortedTimeframes
                .map((timeframe) => timeframe.id)
                .indexOf(startTimestamp)

        return bookedTimeframeDays
            .filter((bookedTFD) => formatISO(bookedTFD.date, {representation: 'date'}) === formatISO(day, {representation: 'date'}))
            .flatMap((bookedTFD) => bookedTFD.timeframes)
            .map((timeframe) => timeframe.id)
            .includes(timeframeId)
    }

    const modifiedClassnames = {
        available: "text-green-700 bg-green-300",
        partialyAvailable: "text-amber-700 bg-amber-300",
        notAvailable: "text-red-700 bg-red-300",
    }
    const notAvailableDays: Date[] = bookedTimeframeDays
        .filter((bookedTFD) => bookedTFD.timeframes.length === sortedTimeframes.length)
        .map((bookedTimeframeDays) => bookedTimeframeDays.date)
    const partialyAvailableDays: Date[] = bookedTimeframeDays
        .filter((bookedTFD) => 0 < bookedTFD.timeframes.length && bookedTFD.timeframes.length < sortedTimeframes.length)
        .map((bookedTimeframeDays) => bookedTimeframeDays.date)
    const availableDays: Date[] = eachDayOfInterval({start: today, end: fiveYearsFromToday})
        .filter((date) => !partialyAvailableDays.map((date) => formatISO(date, {representation: 'date'})).includes(formatISO(date, {representation: 'date'})) && !notAvailableDays.map((date) => formatISO(date, {representation: 'date'})).includes(formatISO(date, {representation: 'date'})))
    const modifierDays = {
        available: availableDays,
        partialyAvailable: partialyAvailableDays,
        notAvailable: notAvailableDays,
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
                            <input required form="reservationForm" type="radio" name="room" id={room.id} value={room.id}
                                   checked={selectedRoom === room.id} onChange={() => {
                                setSelectedRoom(room.id);
                                setSelectedRoomString(room.name)
                            }}
                                   className={"peer hidden"}/>
                            <label htmlFor={room.id}
                                   className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-green-400 peer-checked:bg-green-100 w-full")}>{room.name}</label>
                        </div>)
                    }
                </fieldset>
            </section>
            <hr/>
            <section className={"flex flex-col flex-wrap gap-2"}>
                <span className={cn((!selectedRoom) ? "block" : "hidden")}>Vervolledig de vorige stap.</span>
                <fieldset className={cn(selectedRoom !== undefined ? "block" : "hidden")}>
                    <legend className={"text-xl font-semibold"}>Selecteer het startmoment</legend>
                    <Popover>
                        <PopoverTrigger asChild>
                            <input required readOnly form="reservationForm" type="date" name="start"
                                   value={formatISO(startDate || new Date(), {representation: 'date'})}
                                   className={cn(buttonVariants({variant: "outline"}), "w-full", startDate && "border-green-400")}/>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                required
                                mode={"single"}
                                selected={startDate}
                                onSelect={setStartDate}
                                fromDate={today}
                                toDate={fiveYearsFromToday}
                                fixedWeeks
                                disabled={notAvailableDays}
                                modifiers={modifierDays}
                                modifiersClassNames={modifiedClassnames}
                                locale={nlBE}
                            />
                        </PopoverContent>
                    </Popover>
                </fieldset>
                <fieldset className={cn((!!selectedRoom && !!startDate) ? "flex flex-row flex-wrap gap-2" : "hidden")}>
                    {
                        sortedTimeframes.map((timeframe) => <div key={timeframe.id} className={"flex-grow"}>
                            <input required form="reservationForm" type="radio" name="startTimeframe" id={"start-" + timeframe.id} value={timeframe.id}
                                   checked={startTimestamp === timeframe.id} onChange={() => {
                                setStartTimeStamp(timeframe.id);
                                setStartTime(timeframe.start_hour.substring(0, 5))
                            }}
                                   disabled={timeframeDisabledStart(timeframe.id, startDate)}
                                   className={"peer hidden"}/>
                            <label htmlFor={"start-" + timeframe.id}
                                   className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-green-400 peer-checked:bg-green-100 peer-disabled:invisible w-full")}>{timeframe.name} ({timeframe.start_hour.substring(0, 5)})</label>
                        </div>)
                    }
                </fieldset>
            </section>
            <hr/>
            <section className={"flex flex-col flex-wrap gap-2"}>
                <span className={cn((!selectedRoom || !startDate || !startTimestamp) ? "block" : "hidden")}>Vervolledig de vorige stap(pen).</span>
                <fieldset className={cn((startDate !== undefined && startTimestamp !== undefined) ? "block" : "hidden")}>
                    <legend className={"text-xl font-semibold"}>Selecteer het eindmoment</legend>
                    <Popover>
                        <PopoverTrigger asChild>
                            <input required readOnly form="reservationForm" type="date" name="end"
                                   value={formatISO(endDate || startDate || new Date(), {representation: 'date'})}
                                   className={cn(buttonVariants({variant: "outline"}), "w-full", endDate && "border-green-400")}/>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                required
                                mode={"single"}
                                selected={endDate}
                                onSelect={setEndDate}
                                fromDate={startDate}
                                toDate={findMaxRangeDayIfExists() || fiveYearsFromToday}
                                fixedWeeks
                                disabled={notAvailableDays}
                                modifiers={modifierDays}
                                modifiersClassNames={modifiedClassnames}
                                locale={nlBE}
                            />
                        </PopoverContent>
                    </Popover>
                </fieldset>
                <fieldset className={cn((!!selectedRoom && !!startDate && !!startTimestamp && !!endDate) ? "flex flex-row flex-wrap gap-2" : "hidden")}>
                    {
                        sortedTimeframes.map((timeframe) => <div key={timeframe.id} className={"flex-grow"}>
                            <input required form="reservationForm" type="radio" name="endTimeframe" id={"end-" + timeframe.id} value={timeframe.id}
                                   checked={endTimestamp === timeframe.id} onChange={() => {
                                setEndTimestamp(timeframe.id);
                                setEndTime(timeframe.end_hour.substring(0, 5))
                            }}
                                   disabled={timeframeDisabledEnd(timeframe.id, endDate)}
                                   className={"peer hidden"}/>
                            <label htmlFor={"end-" + timeframe.id}
                                   className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-green-400 peer-checked:bg-green-100 peer-disabled:invisible w-full")}>{timeframe.name} ({timeframe.end_hour.substring(0, 5)})</label>
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
                               className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-green-400 peer-checked:bg-green-100 w-full")}>Drank</label>
                    </div>
                    {
                        materials.data?.map((material) => <div key={material.id} className={"flex-grow hidden"}>
                            <input form="reservationForm" type="checkbox" name="material" id={"material-" + material.id} value={material.id} className={"peer hidden"}/>
                            <label htmlFor={"material-" + material.id}
                                   className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-green-400 peer-checked:bg-green-100 w-full")}>{material.name}</label>
                        </div>)
                    }
                </fieldset>
            </section>
            <hr/>
            <section className={"flex flex-col flex-wrap gap-2"}>
                <span
                    className={cn((!selectedRoom || !startDate || !startTimestamp || !endDate || !endTimestamp) ? "block" : "hidden")}>Vervolledig de vorige stap(pen).</span>
                <fieldset
                    className={cn((!!selectedRoom && !!startDate && !!startTimestamp && !!endDate && !!endTimestamp) ? "flex flex-col flex-wrap gap-2" : "hidden")}>
                    <label htmlFor={"existOrganization"}
                           className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Organisatie
                        (optioneel)</label>
                    <select id={"existOrganization"} name={"existOrganization"}
                            className={cn(buttonVariants({variant: "outline"}), "lg:max-w-[25%]")}
                            defaultValue={"organisatie"}>
                        <option value={"organisatie"} disabled hidden>Kies een organisatie</option>
                        {
                            organizations.data?.map((organization, index) => (
                                <option key={index} value={organization.id}
                                        onChange={() => setSelectedOrganization(organization.id)}>{organization.name}</option>
                            ))
                        }
                    </select>
                </fieldset>
            </section>
            <hr/>
            <section className={"flex flex-col flex-wrap gap-2"}>
                <span
                    className={cn((!selectedRoom || !startDate || !startTimestamp || !endDate || !endTimestamp) ? "block" : "hidden")}>Vervolledig de vorige stap(pen).</span>
                <fieldset
                    className={cn((!!selectedRoom && !!startDate && !!startTimestamp && !!endDate && !!endTimestamp) ? "flex flex-row flex-wrap gap-2" : "hidden")}>
                    <input type={"checkbox"} className={"h-6 justify-center"}
                           onChange={() => setSelectedConditions(!selectedConditions)}/>
                    <label className={""}>Ik ga akkoord met het <Link href={document} target={"_blank"}>reglement
                        vergaderzalen</Link></label>
                </fieldset>
            </section>
            <hr/>
            <section>
                <p>Je bent aangemeld als {gebruiker.data && gebruiker.data[0].firstname}</p>
                <input form="reservationForm" type="text" name="userId" defaultValue={user?.id} readOnly className={"hidden"}/>
            </section>
            <section>
                <Dialog>
                    <DialogTrigger
                        disabled={(!selectedRoom || !startDate || !startTimestamp || !endDate || !endTimestamp || !selectedConditions)}
                        className={buttonVariants()}>Reserveer</DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Overzicht</DialogTitle>
                        <DialogDescription>
                            <div className={"grid grid-cols-2 my-4"}>
                                <span className={"font-bold"}>Datum:</span>
                                <span>{startDate?.toISOString().substring(0, 10) === endDate?.toISOString().substring(0, 10) ? startDate?.toISOString().substring(0, 10) : startDate?.toISOString().substring(0, 10) + " tot " + endDate?.toISOString().substring(0, 10)}</span>
                                <span className={"font-bold"}>Tijd:</span>
                                <span>{startTime} - {endTime}</span>
                                <span className={"font-bold"}>Zaal:</span>
                                <span>{selectedRoomString}</span>
                            </div>
                            <h2 className={"text-xl font-bold text-center"}>Uw gegevens</h2>
                            <div className={"grid grid-cols-2 my-4"}>
                                <span className={"font-bold"}>Naam:</span>
                                <span>{gebruiker.data && gebruiker.data[0].firstname} {gebruiker.data && gebruiker.data[0].lastname}</span>
                                <span className={"font-bold"}>Email:</span>
                                <span>{gebruiker.data && gebruiker.data[0].email}</span>
                                <span className={"font-bold"}>Gsm-nummer:</span>
                                <span>{gebruiker.data && gebruiker.data[0].phone}</span>
                                <span className={"font-bold"}>Straat en huisnr</span>
                                <span>{gebruiker.data && gebruiker.data[0].street}</span>
                                <span className={"font-bold"}>Woonplaats</span>
                                <span>{gebruiker.data && gebruiker.data[0].city}</span>
                                <span className={"font-bold"}>Organistie</span>
                                <span>{selectedOrganization}</span>
                                <span className={"font-bold"}>BTW-nummer</span>
                                <span></span>
                            </div>
                        </DialogDescription>
                        <DialogFooter>
                            <button
                                disabled={(!selectedRoom || !startDate || !startTimestamp || !endDate || !endTimestamp || !selectedConditions)}
                                form={"reservationForm"} className={buttonVariants()}>Reserveer
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                {/*<button
                    disabled={(!selectedRoom || !startDate || !startTimestamp || !endDate || !endTimestamp || !selectedConditions)}
                    form={"reservationForm"} className={buttonVariants()}>Reserveer
                </button>*/}
            </section>
        </div>
    </div>
}