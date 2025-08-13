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
import { nlBE } from "date-fns/locale";
import { useCallback, useEffect, useMemo, useState } from "react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z, { output } from "zod";

import Button from "@/components/atoms/Button";
import Calendar from "@/components/atoms/Calendar";
import Checkbox from "@/components/atoms/Checkbox";
import Form, {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select";
import { Textarea } from "@/components/atoms/textarea";
import getHalls from "@/service/halls/getHalls";
import getMyOrganisations from "@/service/organisations/getMyOrganisations";
import createReservation from "@/service/reservations/createReservation";
import getReservations from "@/service/reservations/getReservations";
import getTimeslots from "@/service/timeslots/getTimeslots";

const schema = z.object({
    acceptedPolicy: z
        .boolean()
        .refine((val) => val === true, {
            message: "Je moet het reglement accepteren",
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

// Helper to safely pluck string props from unknown data
const getStringProp = (obj: unknown, key: string): string | undefined => {
    if (obj && typeof obj === "object" && key in obj) {
        const val = (obj as Record<string, unknown>)[key];
        if (typeof val === "string") return val;
    }
    return undefined;
};

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
    const { data: organisations } = useQuery({
        queryFn: getMyOrganisations,
        queryKey: ["my-organisations"],
    });

    console.debug("Fetched data:", { halls, reservations, timeslots });

    // All pre-form data transformation:
    // ...

    // All mutation-related:
    const { mutateAsync } = useMutation({ mutationFn: createReservation });

    const form = useForm<output<typeof schema>>({
        defaultValues: {
            acceptedPolicy: false,
            endDate: undefined,
            endTimeslotId: undefined as unknown as string,
            isParty: false,
            organisationId: undefined as unknown as string,
            organisationType: "personal",
            remarks: "",
            selectedHallIds: [],
            startDate: undefined,
            startTimeslotId: undefined as unknown as string,
        },
        resolver: zodResolver(schema),
        shouldUnregister: false,
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
        throw new Error("Ongeldig formaat voor tijdslot");
    }, []);

    const onSubmitValid = useCallback<SubmitHandler<output<typeof schema>>>(
        async (data) => {
            const startSlot = timeslots?.find(
                (t: unknown) => getStringProp(t, "id") === data.startTimeslotId
            );
            const endSlot = timeslots?.find(
                (t: unknown) => getStringProp(t, "id") === data.endTimeslotId
            );
            if (!startSlot || !endSlot)
                throw new Error("Geselecteerd tijdslot niet gevonden");

            const startTime = getStringProp(startSlot, "start_time");
            const endTime = getStringProp(endSlot, "end_time");
            if (!startTime || !endTime)
                throw new Error("Tijdslot-tijd ontbreekt");

            const startDateTime = combineDateAndTime(data.startDate, startTime);
            const endDateTime = combineDateAndTime(data.endDate, endTime);

            if (endDateTime <= startDateTime)
                throw new Error("Eindtijd moet na starttijd liggen");

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
    // Invalid submission handler retained for potential future use

    // Wizard state
    const steps = useMemo(
        () => [
            { key: "isParty", title: "Weekendfeest" },
            { key: "organisation", title: "Persoon of organisatie" },
            { key: "halls", title: "Zalen selecteren" },
            { key: "start", title: "Start" },
            { key: "end", title: "Einde" },
            { key: "remarks", title: "Opmerkingen" },
            { key: "confirm", title: "Overzicht & reglement" },
            { key: "done", title: "Bevestiging" },
        ],
        []
    );
    const [activeStep, setActiveStep] = useState(0);

    // Derived helpers
    const isParty = form.watch("isParty");
    const organisationType = form.watch("organisationType");

    // Compute visible steps based on current form state (skip halls/end for weekendfeest)
    const visibleSteps = useMemo(
        () =>
            steps.filter(
                (s) => !(isParty && (s.key === "halls" || s.key === "end"))
            ),
        [steps, isParty]
    );
    const activeKey = visibleSteps[activeStep]?.key;
    // Clamp active step if visibility changes (e.g., toggling weekendfeest)
    useEffect(() => {
        setActiveStep((s) => Math.max(0, Math.min(s, visibleSteps.length - 1)));
    }, [visibleSteps.length]);

    const earliestTimeslotId = useMemo(() => {
        if (!timeslots?.length) return undefined;
        const arr = timeslots
            .map((t: unknown) => ({
                id: getStringProp(t, "id"),
                start: getStringProp(t, "start_time"),
            }))
            .filter(
                (x): x is { id: string; start: string } =>
                    Boolean(x.id) && Boolean(x.start)
            )
            .sort((a, b) => a.start.localeCompare(b.start));
        return arr[0]?.id;
    }, [timeslots]);
    const latestTimeslotId = useMemo(() => {
        if (!timeslots?.length) return undefined;
        const arr = timeslots
            .map((t: unknown) => ({
                end: getStringProp(t, "end_time"),
                id: getStringProp(t, "id"),
            }))
            .filter(
                (x): x is { end: string; id: string } =>
                    Boolean(x.id) && Boolean(x.end)
            )
            .sort((a, b) => a.end.localeCompare(b.end));
        return arr.at(-1)?.id;
    }, [timeslots]);

    // Auto-adjust fields when party toggles
    useEffect(() => {
        if (isParty) {
            if (halls?.length) {
                form.setValue(
                    "selectedHallIds",
                    halls
                        .map((h: unknown) => getStringProp(h, "id"))
                        .filter((v): v is string => Boolean(v)),
                    { shouldValidate: true }
                );
            }
            if (earliestTimeslotId)
                form.setValue("startTimeslotId", earliestTimeslotId, {
                    shouldValidate: true,
                });
            if (latestTimeslotId)
                form.setValue("endTimeslotId", latestTimeslotId, {
                    shouldValidate: true,
                });
        }
    }, [isParty, halls, earliestTimeslotId, latestTimeslotId, form]);

    const goNext = useCallback(async () => {
        // Step-level validation
        let valid = true;
        const key = visibleSteps[activeStep]?.key;
        if (key === "isParty") {
            valid = await form.trigger(["isParty"]);
        } else if (key === "organisation") {
            valid = await form.trigger(["organisationType"]);
            if (organisationType === "organisation") {
                const ok = await form.trigger(["organisationId"]);
                valid = valid && ok;
            }
        } else if (key === "halls") {
            if (!isParty) {
                valid = await form.trigger(["selectedHallIds"]);
            }
        } else if (key === "start") {
            if (isParty) {
                valid = await form.trigger(["startDate"]);
                // Mirror endDate to same date
                const d = form.getValues("startDate");
                if (d) form.setValue("endDate", d, { shouldValidate: true });
            } else {
                const ok1 = await form.trigger(["startDate"]);
                const ok2 = await form.trigger(["startTimeslotId"]);
                valid = ok1 && ok2;
            }
        } else if (key === "end") {
            if (!isParty) {
                const ok1 = await form.trigger(["endDate"]);
                const ok2 = await form.trigger(["endTimeslotId"]);
                valid = ok1 && ok2;
                if (valid) {
                    try {
                        const sDate = form.getValues("startDate");
                        const eDate = form.getValues("endDate");
                        const sId = form.getValues("startTimeslotId");
                        const eId = form.getValues("endTimeslotId");
                        const sSlot = timeslots?.find((t) => t.id === sId);
                        const eSlot = timeslots?.find((t) => t.id === eId);
                        if (sDate && eDate && sSlot && eSlot) {
                            const sDT = combineDateAndTime(
                                sDate,
                                sSlot.start_time
                            );
                            const eDT = combineDateAndTime(
                                eDate,
                                eSlot.end_time
                            );
                            if (eDT <= sDT) {
                                form.setError("endTimeslotId", {
                                    message: "End must be after start",
                                    type: "validate",
                                });
                                valid = false;
                            }
                        }
                    } catch {
                        valid = false;
                    }
                }
            }
        } else if (key === "remarks") {
            valid = true;
        } else if (key === "confirm") {
            valid = await form.trigger(["acceptedPolicy"]);
        }

        if (!valid) return;
        if (activeStep < visibleSteps.length - 1) setActiveStep((s) => s + 1);
    }, [
        activeStep,
        visibleSteps,
        form,
        isParty,
        organisationType,
        timeslots,
        combineDateAndTime,
    ]);

    const goPrev = useCallback(
        () => setActiveStep((s) => Math.max(0, s - 1)),
        []
    );

    // Submit on final confirm
    const onSubmitFinal = useCallback(
        async (values: output<typeof schema>) => {
            await onSubmitValid(values);
            setActiveStep(visibleSteps.length - 1);
        },
        [onSubmitValid, visibleSteps.length]
    );

    const isLastEditableStep =
        activeStep === visibleSteps.findIndex((s) => s.key === "confirm");

    return (
        <div className="container mx-auto max-w-3xl py-4">
            <h2 className="mb-2 text-xl font-semibold">Reservatie aanvragen</h2>
            <p className="mb-6 text-sm text-muted-foreground">
                Gelieve de onderstaande stappen te doorlopen om een reservatie
                aan te vragen.
            </p>

            {/* Step indicator */}
            <ol className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {visibleSteps.map((s, idx) => (
                    <li
                        className={`rounded border p-2 text-xs ${
                            idx === activeStep
                                ? "border-primary"
                                : idx < activeStep
                                  ? "border-green-500"
                                  : "border-border"
                        }`}
                        key={s.key}
                    >
                        <div className="font-medium">
                            {idx + 1}. {s.title}
                        </div>
                    </li>
                ))}
            </ol>

            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={void form.handleSubmit(onSubmitFinal)}
                >
                    {/* Step 1: Weekend party? */}
                    {activeKey === "isParty" && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="isParty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Is dit een weekendfeest?
                                        </FormLabel>
                                        <FormDescription>
                                            Indien ja, worden alle zalen voor de
                                            volledige geselecteerde dag
                                            gereserveerd.
                                        </FormDescription>
                                        <FormControl>
                                            <RadioGroup
                                                className="flex gap-6"
                                                onValueChange={(v) =>
                                                    field.onChange(v === "yes")
                                                }
                                                value={
                                                    field.value ? "yes" : "no"
                                                }
                                            >
                                                <label className="flex items-center gap-2">
                                                    <RadioGroupItem value="no" />
                                                    <span>Nee</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <RadioGroupItem value="yes" />
                                                    <span>Ja</span>
                                                </label>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {/* Step 2: Organisation type + optional organisation select */}
                    {activeKey === "organisation" && (
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="organisationType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Wie reserveert?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                className="flex gap-6"
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <label className="flex items-center gap-2">
                                                    <RadioGroupItem value="personal" />
                                                    <span>Persoonlijk</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <RadioGroupItem value="organisation" />
                                                    <span>Organisatie</span>
                                                </label>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {organisationType === "organisation" && (
                                <FormField
                                    control={form.control}
                                    name="organisationId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Organisatie</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value ?? ""}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecteer organisatie" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {organisations?.map(
                                                            (
                                                                o: unknown,
                                                                idx
                                                            ) => {
                                                                const id =
                                                                    getStringProp(
                                                                        o,
                                                                        "id"
                                                                    ) ??
                                                                    String(idx);
                                                                const name =
                                                                    getStringProp(
                                                                        o,
                                                                        "name"
                                                                    ) ?? id;
                                                                return (
                                                                    <SelectItem
                                                                        key={id}
                                                                        value={
                                                                            id
                                                                        }
                                                                    >
                                                                        {name}
                                                                    </SelectItem>
                                                                );
                                                            }
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                    )}

                    {/* Step 3: Halls (skip if party) */}
                    {activeKey === "halls" && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="selectedHallIds"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Selecteer zalen</FormLabel>
                                        <FormDescription>
                                            Kies één of meerdere zalen om te
                                            reserveren.
                                        </FormDescription>
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {halls?.map((h: unknown) => (
                                                <FormField
                                                    control={form.control}
                                                    key={
                                                        getStringProp(
                                                            h,
                                                            "id"
                                                        ) ?? "hall"
                                                    }
                                                    name="selectedHallIds"
                                                    render={({ field }) => {
                                                        const id =
                                                            getStringProp(
                                                                h,
                                                                "id"
                                                            ) ?? "";
                                                        const checked =
                                                            field.value?.includes(
                                                                id
                                                            );
                                                        return (
                                                            <label className="flex cursor-pointer items-center gap-3 rounded border p-3">
                                                                <Checkbox
                                                                    checked={
                                                                        !!checked
                                                                    }
                                                                    onCheckedChange={(
                                                                        v
                                                                    ) => {
                                                                        const on =
                                                                            Boolean(
                                                                                v
                                                                            );
                                                                        if (
                                                                            on
                                                                        ) {
                                                                            field.onChange(
                                                                                [
                                                                                    ...(field.value ??
                                                                                        []),
                                                                                    id,
                                                                                ]
                                                                            );
                                                                        } else {
                                                                            field.onChange(
                                                                                (
                                                                                    field.value ??
                                                                                    []
                                                                                ).filter(
                                                                                    (
                                                                                        x: string
                                                                                    ) =>
                                                                                        x !==
                                                                                        id
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                                <span className="text-sm">
                                                                    {getStringProp(
                                                                        h,
                                                                        "name"
                                                                    ) ?? id}
                                                                </span>
                                                            </label>
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {/* Step 4: Start (party = date only) */}
                    {activeKey === "start" && (
                        <div className="space-y-4">
                            {isParty ? (
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Datum weekendfeest
                                            </FormLabel>
                                            <FormControl>
                                                <Calendar
                                                    className="rounded-lg border"
                                                    disabled={(date) =>
                                                        date <= new Date()
                                                    }
                                                    locale={nlBE}
                                                    mode="single"
                                                    onSelect={(d) =>
                                                        field.onChange(
                                                            d ?? undefined
                                                        )
                                                    }
                                                    selected={field.value}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Alle zalen worden geboekt van
                                                00:00 tot 23:59 op de
                                                geselecteerde datum.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Startdatum
                                                </FormLabel>
                                                <FormControl>
                                                    <Calendar
                                                        className="rounded-lg border"
                                                        disabled={(date) =>
                                                            date <= new Date()
                                                        }
                                                        locale={nlBE}
                                                        mode="single"
                                                        onSelect={(d) =>
                                                            field.onChange(
                                                                d ?? undefined
                                                            )
                                                        }
                                                        selected={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="startTimeslotId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Starttijdslot
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecteer starttijd" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {timeslots?.map(
                                                                (
                                                                    t: unknown,
                                                                    idx
                                                                ) => {
                                                                    const id =
                                                                        getStringProp(
                                                                            t,
                                                                            "id"
                                                                        ) ??
                                                                        String(
                                                                            idx
                                                                        );
                                                                    const start =
                                                                        getStringProp(
                                                                            t,
                                                                            "start_time"
                                                                        ) ?? "";
                                                                    return (
                                                                        <SelectItem
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                id
                                                                            }
                                                                        >
                                                                            {
                                                                                start
                                                                            }
                                                                        </SelectItem>
                                                                    );
                                                                }
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 5: End (skip for party) */}
                    {activeKey === "end" && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Einddatum</FormLabel>
                                        <FormControl>
                                            <Calendar
                                                className="rounded-lg border"
                                                disabled={(date) =>
                                                    date <= new Date()
                                                }
                                                locale={nlBE}
                                                mode="single"
                                                onSelect={(d) =>
                                                    field.onChange(
                                                        d ?? undefined
                                                    )
                                                }
                                                selected={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endTimeslotId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Eindtijdslot</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value ?? ""}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecteer eindtijd" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {timeslots?.map(
                                                        (t: unknown, idx) => {
                                                            const id =
                                                                getStringProp(
                                                                    t,
                                                                    "id"
                                                                ) ??
                                                                String(idx);
                                                            const end =
                                                                getStringProp(
                                                                    t,
                                                                    "end_time"
                                                                ) ?? "";
                                                            return (
                                                                <SelectItem
                                                                    key={id}
                                                                    value={id}
                                                                >
                                                                    {end}
                                                                </SelectItem>
                                                            );
                                                        }
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {/* Step 6: Remarks */}
                    {activeKey === "remarks" && (
                        <FormField
                            control={form.control}
                            name="remarks"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Opmerkingen (optioneel)
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea rows={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {/* Step 7: Confirm + policy */}
                    {activeKey === "confirm" && (
                        <div className="space-y-6">
                            <div className="rounded-md border p-4 text-sm">
                                <h3 className="mb-2 font-medium">Overzicht</h3>
                                <ul className="space-y-1">
                                    <li>
                                        Weekendfeest: {isParty ? "Ja" : "Nee"}
                                    </li>
                                    <li>
                                        Type aanvrager: {organisationType}
                                        {organisationType ===
                                            "organisation" && (
                                            <>
                                                {" "}
                                                –{" "}
                                                {organisations?.find(
                                                    (o) =>
                                                        String(o.id) ===
                                                        String(
                                                            form.getValues(
                                                                "organisationId"
                                                            )
                                                        )
                                                )?.name ??
                                                    form.getValues(
                                                        "organisationId"
                                                    )}
                                            </>
                                        )}
                                    </li>
                                    {!isParty && (
                                        <li>
                                            Zalen:{" "}
                                            {halls
                                                ?.filter((h: unknown) =>
                                                    form
                                                        .getValues(
                                                            "selectedHallIds"
                                                        )
                                                        ?.includes(
                                                            String(
                                                                getStringProp(
                                                                    h,
                                                                    "id"
                                                                )
                                                            )
                                                        )
                                                )
                                                .map(
                                                    (h: unknown) =>
                                                        getStringProp(
                                                            h,
                                                            "name"
                                                        ) ??
                                                        (getStringProp(
                                                            h,
                                                            "id"
                                                        ) ||
                                                            "")
                                                )
                                                .join(", ") || "-"}
                                        </li>
                                    )}
                                    <li>
                                        Start:{" "}
                                        {form
                                            .getValues("startDate")
                                            ?.toLocaleDateString() || "-"}{" "}
                                        {getStringProp(
                                            timeslots?.find(
                                                (t: unknown) =>
                                                    String(
                                                        getStringProp(t, "id")
                                                    ) ===
                                                    String(
                                                        form.getValues(
                                                            "startTimeslotId"
                                                        )
                                                    )
                                            ),
                                            "start_time"
                                        ) ||
                                            (isParty
                                                ? earliestTimeslotId &&
                                                  getStringProp(
                                                      timeslots?.find(
                                                          (t: unknown) =>
                                                              getStringProp(
                                                                  t,
                                                                  "id"
                                                              ) ===
                                                              earliestTimeslotId
                                                      ),
                                                      "start_time"
                                                  )
                                                : "")}
                                    </li>
                                    <li>
                                        Einde:{" "}
                                        {form
                                            .getValues("endDate")
                                            ?.toLocaleDateString() ||
                                            (isParty
                                                ? form
                                                      .getValues("startDate")
                                                      ?.toLocaleDateString()
                                                : "-")}{" "}
                                        {getStringProp(
                                            timeslots?.find(
                                                (t: unknown) =>
                                                    String(
                                                        getStringProp(t, "id")
                                                    ) ===
                                                    String(
                                                        form.getValues(
                                                            "endTimeslotId"
                                                        )
                                                    )
                                            ),
                                            "end_time"
                                        ) ||
                                            (isParty
                                                ? latestTimeslotId &&
                                                  getStringProp(
                                                      timeslots?.find(
                                                          (t: unknown) =>
                                                              getStringProp(
                                                                  t,
                                                                  "id"
                                                              ) ===
                                                              latestTimeslotId
                                                      ),
                                                      "end_time"
                                                  )
                                                : "")}
                                    </li>
                                    {form.getValues("remarks") && (
                                        <li>
                                            Opmerkingen:{" "}
                                            {form.getValues("remarks")}
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <FormField
                                control={form.control}
                                name="acceptedPolicy"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(v) =>
                                                    field.onChange(Boolean(v))
                                                }
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <span className="text-sm">
                                                Ik heb het reglement gelezen en
                                                ga ermee akkoord.{" "}
                                                <a
                                                    className="underline"
                                                    href="/documents/Reglement_vergaderzalen_Ten_Boomgaerde_vzw.pdf"
                                                    rel="noreferrer"
                                                    target="_blank"
                                                >
                                                    Bekijk reglement
                                                </a>
                                            </span>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {/* Step 8: Done */}
                    {activeKey === "done" && (
                        <div className="rounded-md border p-6">
                            <h3 className="mb-2 text-lg font-semibold">
                                Reservatie-aanvraag verzonden
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Uw aanvraag werd succesvol ingediend. U ontvangt
                                een bevestigingsmail na manuele controle.
                            </p>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-8 flex items-center justify-between">
                        <Button
                            disabled={
                                activeStep === 0 ||
                                activeStep === visibleSteps.length - 1
                            }
                            onClick={goPrev}
                            type="button"
                            variant="outline"
                        >
                            Terug
                        </Button>

                        {activeStep < visibleSteps.length - 1 &&
                            !isLastEditableStep && (
                                <Button
                                    onClick={() => void goNext()}
                                    type="button"
                                >
                                    Volgende
                                </Button>
                            )}

                        {isLastEditableStep && (
                            <Button type="submit">Reservatie bevestigen</Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ReservationForm;
