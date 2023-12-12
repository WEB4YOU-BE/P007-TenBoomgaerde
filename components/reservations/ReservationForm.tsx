"use client"

import {useEffect, useState} from "react";
import {PostgrestSingleResponse, User} from "@supabase/supabase-js";
import {Tables} from "@/lib/database.types";
import {compareAsc, eachDayOfInterval, formatISO} from "date-fns";

export default function ReservationForm({submit, rooms, timeframes, materials, gebruiker, user, allReservations, organisations}: {
    submit: (formData: FormData) => Promise<never>,
    rooms: PostgrestSingleResponse<Tables<"rooms">[]>,
    timeframes: PostgrestSingleResponse<Tables<"bloks">[]>,
    materials: PostgrestSingleResponse<Tables<"products">[]>,
    gebruiker: PostgrestSingleResponse<Tables<"users">[]>,
    allReservations: PostgrestSingleResponse<Tables<"reservations">[]>,
    organisations: PostgrestSingleResponse<Tables<"organizations">[]>,
    user: User | null,
}) {
    // TODAY
    const today = new Date()

    // STATES
    const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined)
    const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(undefined)
    const [selectedStartTimeframe, setSelectedStartTimeframe] = useState<string | undefined>(undefined)
    const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(undefined)
    const [selectedEndTimeframe, setSelectedEndTimeframe] = useState<string | undefined>(undefined)
    const [selectedOrganisation, setSelectedOrganisation] = useState<string | undefined>(undefined)
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
    const sortedTimeframes = normalizedTimeframes
        .sort((tf1, tf2) =>
            compareAsc(new Date(Date.parse("2000-01-01T" + tf1.start_hour)), new Date(Date.parse("2000-01-01T" + tf2.start_hour)))
        )

    // FILTER -- BASED ON ROOM SELECTION
    const filteredByRoom = sortedReservations
        .filter((reservation) => reservation.rooms.id === selectedRoom)
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


    return (
        <div>
            <form id="reservationForm" action={submit}/>
            <h1 className={"text-3xl font-bold"}>Reservatie</h1>
            <div className={"rounded-lg bg-gray-100 shadow-sm p-2 flex flex-col gap-4"}>
                <section>
                    <fieldset>
                        <legend>Selecteer de zaal</legend>
                        {
                            normalizedRooms.map((room) => <div key={room.id}>
                                <input required form="reservationForm" type="radio" name="room" id={room.id} value={room.id}
                                       checked={selectedRoom === room.id} onChange={() => setSelectedRoom(room.id)}/>
                                <label htmlFor={room.id}>{room.name}</label>
                            </div>)
                        }
                    </fieldset>
                </section>
                <hr/>
                <section>
                    <fieldset>
                        <legend>Selecteer het startmoment</legend>
                    </fieldset>
                </section>
                <hr/>
                <section>
                    <fieldset>
                        <legend>Selecteer het eindmoment</legend>
                    </fieldset>
                </section>
                <hr/>
                <section>
                    <fieldset>
                        <legend>Duid uw extra&apos;s aan</legend>
                    </fieldset>
                </section>
                <hr/>
                <section>
                    <fieldset>
                        <legend>Selecteer jouw organisatie (optioneel)</legend>
                    </fieldset>
                </section>
                <hr/>
                <section>
                    <fieldset>
                        <legend>Aangemeld als</legend>
                    </fieldset>
                </section>
                <hr/>
                <section>
                    <fieldset>
                        <legend>Terms &amp; conditions</legend>
                    </fieldset>
                </section>
            </div>
        </div>
    );
}