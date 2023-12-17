"use client"

import {useEffect, useState} from "react";
import {PostgrestSingleResponse, User} from "@supabase/supabase-js";
import {Tables} from "@/lib/database.types";
import {addYears, compareAsc, eachDayOfInterval, formatISO} from "date-fns";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/Popover";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import nlBE from "date-fns/locale/nl-BE";
import {Calendar} from "@/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/Select";
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
    allReservations: PostgrestSingleResponse<Tables<"reservations">[]>,
    organizations: PostgrestSingleResponse<Tables<"organizations">[]>,
    user: User | null,
}) {
    let document = "/documents/Reglement_vergaderzalen_Ten_Boomgaerde_vzw.pdf"
    // TODAY
    const today = new Date()

    // STATES
    const [selectedRoom, setSelectedRoom] = useState<Tables<"rooms"> | undefined>(undefined)
    const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(undefined)
    const [selectedStartTimeframe, setSelectedStartTimeframe] = useState<string | undefined>(undefined)
    const [selectedStartTimeframeString, setSelectedStartTimeframeString] = useState<string | undefined>(undefined)
    const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(undefined)
    const [selectedEndTimeframe, setSelectedEndTimeframe] = useState<string | undefined>(undefined)
    const [selectedEndTimeframeString, setSelectedEndTimeframeString] = useState<string | undefined>(undefined)
    const [selectedOrganisation, setSelectedOrganisation] = useState<Tables<"organizations"> | undefined>(undefined)
    const [acceptedConditions, setAcceptedConditions] = useState<boolean>(false)
    
    // REMOVE ON CHANGES
    useEffect(() => {
        setSelectedStartDate(undefined)
        setSelectedStartTimeframe(undefined);
        setSelectedEndDate(undefined);
        setSelectedEndTimeframe(undefined);
        setSelectedOrganisation(undefined);
        setAcceptedConditions(false);
    }, [selectedRoom]);
    useEffect(() => {
        setSelectedStartTimeframe(undefined);
        setSelectedEndDate(undefined);
        setSelectedEndTimeframe(undefined);
        setSelectedOrganisation(undefined);
        setAcceptedConditions(false);
    }, [selectedStartDate]);
    useEffect(() => {
        setSelectedEndDate(undefined);
        setSelectedEndTimeframe(undefined);
        setSelectedOrganisation(undefined);
        setAcceptedConditions(false);
    }, [selectedStartTimeframe]);
    useEffect(() => {
        setSelectedEndTimeframe(undefined);
        setSelectedOrganisation(undefined);
        setAcceptedConditions(false);
    }, [selectedEndDate]);
    useEffect(() => {
        setSelectedOrganisation(undefined);
        setAcceptedConditions(false);
    }, [selectedEndTimeframe]);
    useEffect(() => {
        setAcceptedConditions(false);
    }, [selectedOrganisation]);

    // NORMALIZE VALUES
    const normalizedRooms = rooms.data || []

    const normalizedReservations = allReservations.data || []
    const sortedReservations = normalizedReservations
        .sort((res1, res2) =>
            compareAsc(new Date(res1.start_date), new Date(res2.start_date)));
    const normalizedTimeframes = timeframes.data || []
    const sortTimeframesFn = (tf1: Tables<"bloks">, tf2: Tables<"bloks">) =>
        compareAsc(new Date(Date.parse("2000-01-01T" + tf1.start_hour)), new Date(Date.parse("2000-01-01T" + tf2.start_hour)))
    const sortedTimeframes = normalizedTimeframes.sort(sortTimeframesFn)
    const normalizedOrganizations = organizations.data || []
    const sortedOrganizations = normalizedOrganizations.sort(
        (org1, org2) =>
            org1.name.localeCompare(org2.name))

    // FILTER -- BASED ON ROOM SELECTION
    const filteredByRoom = sortedReservations
        .filter((reservation) => reservation.rooms.id === selectedRoom?.id)
        .filter((reservation) => reservation.status !== "geweigerd");

    // MAPPED -- ALL TIMEFRAMES IN A GIVEN DAY, WHICH ARE NOT AVAILABLE ANYMORE
    const listedByDate = filteredByRoom
        .flatMap((reservation): { date: string, timeframes: Tables<"bloks">[] }[] =>
            eachDayOfInterval({start: new Date(reservation.start_date), end: new Date(reservation.end_date)})
                .flatMap((reservationDate): { date: string, timeframes: Tables<"bloks">[] } => {
                        return {date: formatISO(reservationDate, {representation: "date"}), timeframes: []}
                    }
                )
        )
    const listedAndSortedByDate = listedByDate
        .sort((day1, day2) =>
            compareAsc(new Date(day1.date), new Date(day2.date)));
    const filteredByUniqueDate = listedAndSortedByDate
        .filter((value, index, array) => index === array.findIndex(value1 => value1.date === value.date))
    const addedTimeFramesToDate = filteredByUniqueDate
        .map((date) => {
            return {
                date: date.date,
                timeframes: getTimeframesFromDate(date.date)
            }
        })

    function getTimeframesFromDate(date: string): Tables<"bloks">[] {
        const tfs: Tables<"bloks">[] = []

        filteredByRoom
            .forEach((reservation) => {
                eachDayOfInterval({start: new Date(reservation.start_date), end: new Date(reservation.end_date)})
                    .forEach((reservationDate) => {
                        const normalizedReservationDate = formatISO(reservationDate, {representation: "date"})
                        if (date === normalizedReservationDate) {
                            if (normalizedReservationDate !== reservation.start_date && normalizedReservationDate !== reservation.end_date) tfs.push(...sortedTimeframes)
                            if (normalizedReservationDate === reservation.start_date && normalizedReservationDate !== reservation.end_date) tfs.push(...sortedTimeframes.filter((tf) => tf.start_hour.substring(0, 2) >= reservation.start_hour.start_hour.substring(0, 2)))
                            if (normalizedReservationDate !== reservation.start_date && normalizedReservationDate === reservation.end_date) tfs.push(...sortedTimeframes.filter((tf) => tf.end_hour.substring(0, 2) <= reservation.end_hour.end_hour.substring(0, 2)))
                            if (normalizedReservationDate === reservation.start_date && normalizedReservationDate === reservation.end_date) tfs.push(...sortedTimeframes.filter((tf) => tf.start_hour.substring(0, 2) >= reservation.start_hour.start_hour.substring(0, 2) && tf.end_hour.substring(0, 2) <= reservation.end_hour.end_hour.substring(0, 2)))
                        }
                    });
            });

        return tfs
    }

    function timeframeDisabledStart(timeframeId: string, day?: Date): boolean {
        if (day === undefined) return false
        return addedTimeFramesToDate
            .filter((bookedTFD) => bookedTFD.date === formatISO(day, {representation: 'date'}))
            .filter((bookedTFD) => bookedTFD.timeframes.map((tf) => tf.id).includes(timeframeId))
            .length > 0
    }

    function findNextFirstReservationDate() {
        let lastDate = new Date()
        if (!selectedStartDate || !selectedStartTimeframe) return lastDate

        lastDate = eachDayOfInterval({start: new Date(selectedStartDate), end: addYears(today, 3)})
            .find((possibleLastDate, index) => {
                if (addedTimeFramesToDate.find(value => value.date === formatISO(possibleLastDate, {representation: "date"})) === undefined) return false
                if (index === 0 && addedTimeFramesToDate.find(value => value.date === formatISO(possibleLastDate, {representation: "date"}))!.timeframes.sort(sortTimeframesFn).reverse()[0].end_hour.substring(0, 2) < sortedTimeframes.find(value => value.id === selectedStartTimeframe)!.start_hour.substring(0, 2)) return false
                return true
            }) || addYears(today, 3)

        return lastDate
    }

    function isDisabledEndTF(timeframeId: string) {
        const possibleTimeframe = sortedTimeframes.find(tf => tf.id === timeframeId)
        if (possibleTimeframe === undefined) return true

        if (!selectedStartDate) return true
        if (!selectedEndDate) return true
        if (!selectedStartTimeframe) return true
        const startTFObject = sortedTimeframes.find(tf => tf.id === selectedStartTimeframe)
        if (startTFObject === undefined) return true

        if (formatISO(selectedStartDate, {representation: "date"}) === formatISO(selectedEndDate, {representation: "date"})) {
            const tfsOnEndDateBeforeStartTF = sortedTimeframes.filter(tf => tf.start_hour.substring(0, 2) < startTFObject.start_hour.substring(0, 2))
            if (tfsOnEndDateBeforeStartTF.some(tf => tf.id === possibleTimeframe.id)) return true
        }

        const possiblyReservedOnEndDate = addedTimeFramesToDate.find(date => date.date === formatISO(selectedEndDate, {representation: "date"}))
        if (possiblyReservedOnEndDate === undefined) return false

        if (possiblyReservedOnEndDate.timeframes.map(tf => tf.id).includes(timeframeId)) return true

        const tfsOnEndDateAfterFirstResTF = sortedTimeframes.filter(tf => tf.start_hour.substring(0, 2) > possiblyReservedOnEndDate.timeframes[0].start_hour.substring(0, 2))
        if (formatISO(selectedStartDate, {representation: "date"}) === formatISO(selectedEndDate, {representation: "date"})) {
            const tfsAfterOrEqStartTF = sortedTimeframes.filter(tf => tf.start_hour.substring(0, 2) >= startTFObject.start_hour.substring(0, 2))
            const tfsAfterOrEqStartTFAndUntilNextFirstResTF = tfsAfterOrEqStartTF.filter(tf => !tfsOnEndDateAfterFirstResTF.filter((tfA) => !(tfA.start_hour.substring(0, 2) <= startTFObject.start_hour.substring(0, 2))).map((tfA) => tfA.id).includes(tf.id))
            if (tfsAfterOrEqStartTFAndUntilNextFirstResTF.some(tf => tf.id === possibleTimeframe.id)) return false
        }
        if (tfsOnEndDateAfterFirstResTF.some(tf => tf.id === possibleTimeframe.id)) return true

        return false
    }

    // MAPPED -- Not available days -- start day
    const notAvailableDays = addedTimeFramesToDate
        .filter((date) => date.timeframes.length === sortedTimeframes.length)
        .map((date) => new Date(date.date));
    // MAPPED -- Partially available days -- start day
    const partiallyAvailableDays = addedTimeFramesToDate
        .filter((date) => date.timeframes.length < sortedTimeframes.length && date.timeframes.length > 0)
        .map((date) => new Date(date.date));
    // MAPPED -- Fully available days -- start day until 5 years from today
    const fullyAvailableDays: Date[] = eachDayOfInterval({start: today, end: addYears(today, 3)})
        .filter((date) => !partiallyAvailableDays.map((date) => formatISO(date, {representation: 'date'})).includes(formatISO(date, {representation: 'date'})) && !notAvailableDays.map((date) => formatISO(date, {representation: 'date'})).includes(formatISO(date, {representation: 'date'})))


    // Add classnames to the correct days
    const modifiedClassnames = {
        available: "text-green-700 bg-green-300",
        partiallyAvailable: "text-amber-700 bg-amber-300",
        notAvailable: "text-red-700 bg-red-300",
    }
    const modifierDays = {
        available: fullyAvailableDays,
        partiallyAvailable: partiallyAvailableDays,
        notAvailable: notAvailableDays,
    }

    const handleOrganizationChange = (selectedOrganization: Tables<"organizations">) => {
        setSelectedOrganisation(selectedOrganization);
        console.log('ik ben hier', selectedOrganization);
    };

    return (
        <div>
            <form id="reservationForm" action={submit}/>
            <h1 className={"text-3xl font-bold"}>Reservatie</h1>
            <div className={"rounded-lg bg-gray-100 shadow-sm p-2 flex flex-col gap-4"}>
                <section>
                    <fieldset className={"flex flex-row flex-wrap gap-2"}>
                        <legend>Selecteer de zaal</legend>
                        {
                            normalizedRooms.map((room) => <div key={room.id} className={"flex-grow"}>
                                <input required form="reservationForm" type="radio" name="room" id={room.id} value={room.id}
                                       checked={selectedRoom === room} onChange={() => setSelectedRoom(room)}
                                       className={"peer hidden"}/>
                                <label htmlFor={room.id}
                                       className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-green-400 peer-checked:bg-green-100 w-full")}>
                                    {room.name}
                                </label>
                            </div>)
                        }
                    </fieldset>
                </section>
                <hr/>
                <section className={"flex flex-col flex-wrap gap-2"}>
                    <span className={cn(!selectedRoom ? "block" : "hidden")}>Vervolledig de vorige stap.</span>
                    <fieldset className={cn(!!selectedRoom ? "block" : "hidden")}>
                        <legend>Selecteer het startmoment</legend>
                        <Popover>
                            <PopoverTrigger asChild>
                                <input required readOnly form="reservationForm" type="date" name="start"
                                       value={formatISO(selectedStartDate || new Date(), {representation: 'date'})}
                                       className={cn(buttonVariants({variant: "outline"}), "w-full", selectedStartDate && "border-green-400")}/>
                            </PopoverTrigger>
                            <PopoverContent className={"w-auto p-0"}>
                                <Calendar
                                    required
                                    mode={"single"}
                                    selected={selectedStartDate}
                                    onSelect={setSelectedStartDate}
                                    fromDate={today}
                                    toDate={addYears(today, 3)}
                                    fixedWeeks
                                    disabled={notAvailableDays}
                                    modifiers={modifierDays}
                                    modifiersClassNames={modifiedClassnames}
                                    locale={nlBE}
                                />
                            </PopoverContent>
                        </Popover>
                    </fieldset>
                    <fieldset className={cn(!!selectedStartDate ? "flex flex-row flex-wrap gap-2" : "hidden")}>
                        {
                            sortedTimeframes.map((timeframe) => <div key={timeframe.id} className={"flex-grow"}>
                                <input required form="reservationForm" type="radio" name="startTimeframe" id={"start-" + timeframe.id} value={timeframe.id}
                                       checked={selectedStartTimeframe === timeframe.id} onChange={() => {
                                    setSelectedStartTimeframe(timeframe.id), setSelectedStartTimeframeString(timeframe.start_hour)
                                }}
                                       disabled={timeframeDisabledStart(timeframe.id, selectedStartDate)}
                                       className={"peer hidden"}/>
                                <label htmlFor={"start-" + timeframe.id}
                                       className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-green-400 peer-checked:bg-green-100 peer-disabled:invisible w-full")}>{timeframe.name} ({timeframe.start_hour.substring(0, 5)})</label>
                            </div>)
                        }
                    </fieldset>
                </section>
                <hr/>
                <section className={"flex flex-col flex-wrap gap-2"}>
                    <span className={cn(!selectedStartTimeframe ? "block" : "hidden")}>Vervolledig de vorige stap(pen).</span>
                    <fieldset className={cn(!!selectedStartTimeframe ? "block" : "hidden")}>
                        <legend>Selecteer het eindmoment</legend>
                        <Popover>
                            <PopoverTrigger asChild>
                                <input required readOnly form="reservationForm" type="date" name="end"
                                       value={formatISO(selectedEndDate || selectedStartDate || new Date(), {representation: 'date'})}
                                       className={cn(buttonVariants({variant: "outline"}), "w-full", selectedEndDate && "border-green-400")}/>
                            </PopoverTrigger>
                            <PopoverContent className={"w-auto p-0"}>
                                <Calendar
                                    required
                                    mode={"single"}
                                    selected={selectedEndDate}
                                    onSelect={setSelectedEndDate}
                                    fromDate={selectedStartDate}
                                    toDate={findNextFirstReservationDate() || addYears(today, 3)} // TODO FIX
                                    fixedWeeks
                                    disabled={notAvailableDays}
                                    modifiers={modifierDays}
                                    modifiersClassNames={modifiedClassnames}
                                    locale={nlBE}
                                />
                            </PopoverContent>
                        </Popover>
                    </fieldset>
                    <fieldset className={cn(!!selectedEndDate ? "flex flex-row flex-wrap gap-2" : "hidden")}>
                        {
                            sortedTimeframes.map((timeframe) => <div key={timeframe.id} className={"flex-grow"}>
                                <input required form="reservationForm" type="radio" name="endTimeframe" id={"end-" + timeframe.id} value={timeframe.id}
                                       checked={selectedEndTimeframe === timeframe.id} onChange={() => {
                                    setSelectedEndTimeframe(timeframe.id), setSelectedEndTimeframeString(timeframe.end_hour)
                                }}
                                       disabled={isDisabledEndTF(timeframe.id)}
                                       className={"peer hidden"}/>
                                <label htmlFor={"end-" + timeframe.id}
                                       className={cn(buttonVariants({variant: "outline"}), "peer-checked:border-green-400 peer-checked:bg-green-100 peer-disabled:invisible w-full")}>{timeframe.name} ({timeframe.end_hour.substring(0, 5)})</label>
                            </div>)
                        }
                    </fieldset>
                </section>
                <hr/>
                <section>
                    {/*TODO: FIX*/}
                    <span className={cn(!selectedEndTimeframe ? "block" : "hidden")}>Vervolledig de vorige stap(pen).</span>
                    <fieldset className={cn(!!selectedEndTimeframe ? "block" : "hidden")}>
                        <legend>Selecteer jouw organisatie (optioneel)</legend>
                        <input form="reservationForm" type="text" name="organisation" readOnly
                               value={selectedOrganisation?.id}
                               className={"hidden"}/>
                        <Select required>
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    sortedOrganizations.map(organization =>
                                        <SelectItem key={organization.id}
                                                    onChange={() => handleOrganizationChange(organization)}
                                                    value={organization.id}>{organization.name}</SelectItem>)
                                }
                            </SelectContent>
                        </Select>
                    </fieldset>
                </section>
                <hr/>
                <section>
                    <fieldset>
                        {/*TODO: FIX*/}
                        <legend>Aangemeld als {gebruiker.data && gebruiker.data[0].firstname}</legend>
                        <input form="reservationForm" type="text" name="userId" defaultValue={user?.id} readOnly
                               className={"hidden"}/>
                    </fieldset>
                </section>
                <hr/>
                <section>
                    <fieldset>
                        <input type={"checkbox"} className={"h-6 justify-center mr-2"}
                               onChange={() => setAcceptedConditions(!acceptedConditions)}/>
                        <label className={""}>Ik ga akkoord met het <Link href={document} target={"_blank"}>reglement
                            vergaderzalen</Link></label>
                    </fieldset>
                </section>
                <section>
                    <Dialog>
                        <DialogTrigger
                            disabled={(!selectedEndTimeframe && !acceptedConditions)}
                            className={buttonVariants()}>Reserveer</DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Overzicht</DialogTitle>
                            <DialogDescription>
                                <div className={"grid grid-cols-2 my-4"}>
                                    <span className={"font-bold"}>Datum:</span>
                                    <span>{selectedStartDate?.getDate() === selectedEndDate?.getDate() ? selectedStartDate?.toISOString().substring(0, 10) : selectedStartDate?.toISOString().substring(0, 10) + " tot " + selectedEndDate?.toISOString().substring(0, 10)}</span>
                                    <span className={"font-bold"}>Tijd:</span>
                                    <span>{selectedStartTimeframeString?.substring(0, 5)} - {selectedEndTimeframeString?.substring(0, 5)}</span>
                                    <span className={"font-bold"}>Zaal:</span>
                                    <span>{selectedRoom?.name}</span>
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
                                    <span>{selectedOrganisation?.name}</span>
                                    <span className={"font-bold"}>BTW-nummer</span>
                                    <span>{selectedOrganisation?.btw_number}</span>
                                </div>
                            </DialogDescription>
                            <DialogFooter>
                                <button
                                    form={"reservationForm"} className={buttonVariants()}>Reserveer
                                </button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </section>
            </div>
        </div>
    );
}