"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getHours,
    getMinutes,
    getSeconds,
    isValid,
    parse,
    set,
} from "date-fns";
import { ComponentPropsWithoutRef, useCallback } from "react";
import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import z, { output } from "zod";

import Form from "@/components/atoms/Form/Form";
import getHalls from "@/service/halls/getHalls";
import createReservation from "@/service/reservations/createReservation";
import getReservations from "@/service/reservations/getReservations";
import getTimeslots from "@/service/timeslots/getTimeslots";

const schema = z.object({
    acceptedPolicy: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must accept the policy",
        }),
    endDate: z.date(),
    endTimeslotId: z.uuidv4(),
    isParty: z.boolean(),
    organisationId: z.uuidv4(),
    organisationType: z.enum(["personal", "organisation"]),
    remarks: z.string().optional(),
    selectedHallIds: z.array(z.string()).min(1),
    startDate: z.date(),
    startTimeslotId: z.uuidv4(),
});

const ReservationForm = () => {
    // All data-fetching:
    const { data: halls } = useQuery({
        queryFn: getHalls,
        queryKey: ["halls"],
    });
    const { data: timeslots } = useQuery({
        queryFn: getTimeslots,
        queryKey: ["timeslots"],
    });
    const { data: reservations } = useQuery({
        queryFn: getReservations,
        queryKey: ["reservations"],
    });

    console.debug("Fetched data:", { halls, reservations, timeslots });

    // All pre-form data transformation:
    // ...

    // All mutation-related:
    const { mutateAsync } = useMutation({ mutationFn: createReservation });

    const form = useForm<output<typeof schema>>({
        resolver: zodResolver(schema),
    });

    // Combines a date with a time string from a timeslot using date-fns
    const combineDateAndTime = useCallback((date: Date, time: string): Date => {
        const formats = ["HH:mm:ss", "HH:mm"] as const;
        for (const fmt of formats) {
            const parsed = parse(time, fmt, date);
            if (isValid(parsed))
                return set(date, {
                    hours: getHours(parsed),
                    milliseconds: 0,
                    minutes: getMinutes(parsed),
                    seconds: getSeconds(parsed),
                });
        }
        throw new Error("Invalid timeslot time format");
    }, []);

    const onSubmitValid = useCallback<SubmitHandler<output<typeof schema>>>(
        async (data) => {
            const startSlot = timeslots?.find(
                (t) => t.id === data.startTimeslotId
            );
            const endSlot = timeslots?.find((t) => t.id === data.endTimeslotId);
            if (!startSlot || !endSlot)
                throw new Error("Selected timeslot not found");

            const startDateTime = combineDateAndTime(
                data.startDate,
                startSlot.start_time
            );
            const endDateTime = combineDateAndTime(
                data.endDate,
                endSlot.end_time
            );

            if (endDateTime <= startDateTime)
                throw new Error("End time must be after start time");

            const signal = AbortSignal.timeout(5000);
            await mutateAsync({
                end: endDateTime.toISOString(),
                hallIds: data.selectedHallIds,
                organisationId:
                    data.organisationType === "organisation"
                        ? data.organisationId
                        : null,
                remarks: data.remarks ?? "",
                signal,
                start: startDateTime.toISOString(),
            });
        },
        [mutateAsync, timeslots, combineDateAndTime]
    );
    const onSubmitInvalid: SubmitErrorHandler<output<typeof schema>> =
        console.error;
    const handleSubmit = useCallback<
        NonNullable<ComponentPropsWithoutRef<"form">["onSubmit"]>
    >(
        (e) => void form.handleSubmit(onSubmitValid, onSubmitInvalid)(e),
        [form, onSubmitValid, onSubmitInvalid]
    );

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>{/* Form fields go here */}</form>
        </Form>
    );
};

export default ReservationForm;
