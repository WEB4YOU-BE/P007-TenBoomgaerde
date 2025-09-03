"use client";

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    formatISO,
    getHours,
    getMinutes,
    getSeconds,
    isSameDay, // added
    isValid,
    parse,
    set,
} from "date-fns";
import { nlBE } from "date-fns/locale";
import { useCallback, useEffect, useMemo, useState } from "react";
import React from "react";
import { ModifiersClassNames } from "react-day-picker";
import { SubmitHandler, useForm } from "react-hook-form";
import z, { output } from "zod";

import type { GetHallsResponse } from "@/service/halls/getHalls";
import type { GetReservationsResponse } from "@/service/reservations/getReservations";
import type { GetTimeslotsResponse } from "@/service/timeslots/getTimeslots";

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
import getUser from "@/service/authentication/getUser";
import getHalls from "@/service/halls/getHalls";
import getMyOrganisations from "@/service/organisations/getMyOrganisations";
import { createGetDayStatus } from "@/service/reservations/createGetDayStatus";
import { createGetDayTimeslotIds } from "@/service/reservations/createGetDayTimeslotIds";
import { createGetEndDateStatus } from "@/service/reservations/createGetEndDateStatus";
import { createGetEndDayTimeslotIds } from "@/service/reservations/createGetEndDayTimeslotIds";
import createReservation from "@/service/reservations/createReservation";
import getReservations from "@/service/reservations/getReservations";
import getTimeslots from "@/service/timeslots/getTimeslots";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

// Replace the flat schema with a discriminated union so organisationId is only
// required when organisationType === "organisation". Also use .uuid().
const commonSchema = z.object({
    acceptedPolicy: z
        .boolean()
        .refine((val) => val, { message: "Je moet het reglement accepteren" }),
    endDate: z.date(),
    endTimeslotId: z.uuid(),
    isParty: z.boolean(),
    remarks: z.string().optional(),
    selectedHallIds: z.array(z.string()).min(1),
    startDate: z.date(),
    startTimeslotId: z.uuid(),
});
const schema = z.discriminatedUnion("organisationType", [
    commonSchema.extend({
        organisationId: z.uuid().optional().nullable(),
        organisationType: z.literal("personal"),
    }),
    commonSchema.extend({
        organisationId: z.uuid(),
        organisationType: z.literal("organisation"),
    }),
]);

// Helper to safely pluck string props from unknown data
const getStringProp = (obj: unknown, key: string): string | undefined => {
    if (obj && typeof obj === "object" && key in obj) {
        const val = (obj as Record<string, unknown>)[key];
        if (typeof val === "string") return val;
    }
    return undefined;
};

// Helpers for availability/normalization (removed legacy variants no longer used)

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
    const { data: user } = useQuery({
        queryFn: getUser,
        queryKey: ["authenticatedUser"],
    });

    // All mutation-related:
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: createReservation,
        onSuccess: () =>
            void queryClient.invalidateQueries({ queryKey: ["reservations"] }),
    });

    const form = useForm<output<typeof schema>>({
        defaultValues: {
            acceptedPolicy: false,
            endDate: new Date(),
            endTimeslotId: "",
            isParty: false,
            organisationId: undefined,
            organisationType: "personal",
            remarks: "",
            selectedHallIds: [],
            startDate: new Date(),
            startTimeslotId: "",
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
            // Enforce "weekendfeest": all halls, first to last timeslot, same day
            if (data.isParty) {
                const allHallIds = (halls ?? [])
                    .map((h: unknown) => getStringProp(h, "id"))
                    .filter((v): v is string => Boolean(v));

                const slotBasics = (timeslots ?? [])
                    .map((t: unknown, idx) => ({
                        end: getStringProp(t, "end_time") ?? "",
                        id: getStringProp(t, "id") ?? String(idx),
                        start: getStringProp(t, "start_time") ?? "",
                    }))
                    .filter((s) => s.id && s.start && s.end);

                const earliest = [...slotBasics].sort((a, b) =>
                    a.start.localeCompare(b.start)
                )[0];
                const latest = [...slotBasics].sort((a, b) =>
                    a.end.localeCompare(b.end)
                )[slotBasics.length - 1];

                const startDateTime = combineDateAndTime(
                    data.startDate,
                    earliest.start
                );
                const endDateTime = combineDateAndTime(
                    data.startDate,
                    latest.end
                );

                const controller = new AbortController();
                const timeout = setTimeout(() => {
                    controller.abort();
                }, 5000);
                try {
                    await mutateAsync({
                        bookerId: user?.id,
                        end: formatISO(endDateTime), // was: endDateTime.toISOString()
                        hallIds: allHallIds,
                        isParty: data.isParty,
                        organisationId:
                            data.organisationType === "organisation"
                                ? data.organisationId
                                : null,
                        remarks: data.remarks ?? "",
                        signal: controller.signal,
                        start: formatISO(startDateTime), // was: startDateTime.toISOString()
                    });
                } finally {
                    clearTimeout(timeout);
                }
                return;
            }

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

            // Use a compatible timeout with AbortController
            const controller = new AbortController();
            const timeout = setTimeout(() => {
                controller.abort();
            }, 5000);
            try {
                await mutateAsync({
                    bookerId: user?.id,
                    end: formatISO(endDateTime), // was: endDateTime.toISOString()
                    hallIds: data.selectedHallIds,
                    isParty: data.isParty,
                    organisationId:
                        data.organisationType === "organisation"
                            ? data.organisationId
                            : null,
                    remarks: data.remarks ?? "",
                    signal: controller.signal,
                    start: formatISO(startDateTime), // was: startDateTime.toISOString()
                });
            } finally {
                clearTimeout(timeout);
            }
        },
        // Added `halls` to ensure we can compute all hall IDs for weekendfeest
        [mutateAsync, timeslots, halls, combineDateAndTime, user]
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
    // Remove the inline fallback to avoid creating a new array each render
    const selectedHallIds = form.watch("selectedHallIds");
    const startDateVal = form.watch("startDate");
    const startTimeslotIdVal = form.watch("startTimeslotId");
    const endDateVal = form.watch("endDate");

    // Availability: normalized reservations no longer required for end-timeslot gating

    const timeslotById = useMemo(() => {
        const map = new Map<
            string,
            { end: string; id: string; start: string }
        >();
        timeslots?.forEach((t: unknown, idx) => {
            const id = getStringProp(t, "id") ?? String(idx);
            const start = getStringProp(t, "start_time") ?? "";
            const end = getStringProp(t, "end_time") ?? "";
            if (id && start && end) map.set(id, { end, id, start });
        });
        return map;
    }, [timeslots]);

    // timeslotIds no longer needed now that end-date disabling is status-based

    // Build day-status function from selected halls + all reservations/timeslots
    const selectedHallsData = useMemo(() => {
        // For weekend party, treat as all halls
        if (isParty) return (halls ?? []) as unknown[];
        const set = new Set<string>(selectedHallIds);
        return (halls ?? []).filter((h: unknown) =>
            set.has(getStringProp(h, "id") ?? "")
        );
    }, [halls, selectedHallIds, isParty]);

    type DayStatusString = "AVAILABLE" | "FULLY_BOOKED" | "PARTIALLY_BOOKED";
    const getDayStatus = useMemo(() => {
        const fn = createGetDayStatus({
            halls: selectedHallsData as unknown as NonNullable<GetHallsResponse>,
            onlyFullDays: isParty,
            onlyWeekend: isParty,
            reservations: (reservations ??
                []) as unknown as NonNullable<GetReservationsResponse>,
            timeslots: (timeslots ??
                []) as unknown as NonNullable<GetTimeslotsResponse>,
        });
        return ({ date }: { date: Date }): DayStatusString =>
            fn({ date }) as unknown as DayStatusString;
    }, [selectedHallsData, reservations, timeslots, isParty]);

    const isStartDateDisabled = useCallback(
        (date: Date | undefined): boolean => {
            if (!date) return false;
            // Block past/today
            if (date <= new Date()) return true;
            const status = getDayStatus({ date });
            if (isParty) {
                // For party: any overlap blocks the whole day
                return status !== "AVAILABLE";
            }
            // For normal flow: disable only if the day is fully booked
            return status === "FULLY_BOOKED";
        },
        [getDayStatus, isParty]
    );

    const [startMonth, setStartMonth] = useState<Date>(new Date());

    // Build modifiers mapping expected by react-day-picker:
    const startModifiers = useMemo(
        () => ({
            AVAILABLE: (date: Date) => getDayStatus({ date }) === "AVAILABLE",
            FULLY_BOOKED: (date: Date) =>
                getDayStatus({ date }) === "FULLY_BOOKED",
            PARTIALLY_BOOKED: (date: Date) =>
                getDayStatus({ date }) === "PARTIALLY_BOOKED",
        }),
        [getDayStatus]
    );

    const modifiersClassNames = useMemo(
        (): ModifiersClassNames => ({
            AVAILABLE: buttonVariants({
                className: "text-green-600",
                size: "icon",
                variant: "outline",
            }),
            FULLY_BOOKED: "text-red-600",
            PARTIALLY_BOOKED: buttonVariants({
                className: "text-yellow-600",
                size: "icon",
                variant: "secondary",
            }),
        }),
        []
    );

    // Removed legacy isTimeslotDisabledOnDate; end-timeslot availability now comes from createGetEndDayTimeslotIds

    // Deprecated: end-date disabling now driven by createGetEndDateStatus

    // Build end-date status resolver relative to the selected start DateTime
    const startDateTimeForEnd = useMemo(() => {
        if (!startTimeslotIdVal) return null;
        const slot = timeslotById.get(startTimeslotIdVal);
        if (!slot) return null;
        try {
            return combineDateAndTime(startDateVal, slot.start);
        } catch {
            return null;
        }
    }, [startDateVal, startTimeslotIdVal, timeslotById, combineDateAndTime]);

    const getEndDateStatus = useMemo(() => {
        if (!startDateTimeForEnd) return null;
        const fn = createGetEndDateStatus({
            halls: selectedHallsData as unknown as NonNullable<GetHallsResponse>,
            // Only applies to non-party flow; we don't merge to full-day
            onlyFullDays: false,
            onlyWeekend: false,
            reservations: (reservations ??
                []) as unknown as NonNullable<GetReservationsResponse>,
            startDateTime: startDateTimeForEnd,
            timeslots: (timeslots ??
                []) as unknown as NonNullable<GetTimeslotsResponse>,
        });
        return ({ date }: { date: Date }) =>
            fn({ date }) as unknown as
                | "AVAILABLE"
                | "FULLY_BOOKED"
                | "PARTIALLY_BOOKED";
    }, [selectedHallsData, reservations, timeslots, startDateTimeForEnd]);

    // End-date modifiers: for weekendfeest mirror day status; otherwise use end-date status
    const endModifiers = useMemo(
        () => ({
            AVAILABLE: (date: Date) =>
                getEndDateStatus?.({ date }) === "AVAILABLE",
            FULLY_BOOKED: (date: Date) =>
                getEndDateStatus?.({ date }) === "FULLY_BOOKED",
            PARTIALLY_BOOKED: (date: Date) =>
                getEndDateStatus?.({ date }) === "PARTIALLY_BOOKED",
        }),
        [getEndDateStatus]
    );

    const isEndDateDisabled = useCallback(
        (date: Date | undefined): boolean => {
            if (!date) return false;
            // Block past/today and require a valid start selection
            if (date <= new Date()) return true;
            if (!getEndDateStatus) return true;
            const status = getEndDateStatus({ date });
            return status === "FULLY_BOOKED";
        },
        [getEndDateStatus]
    );

    // (isDateBlockedForParty) removed in favor of getDayStatus-based disabling

    // Build end-day timeslot resolver relative to selected start and end date
    const getEndDayTimeslotIds = useMemo(() => {
        if (!startDateTimeForEnd) return null;
        return createGetEndDayTimeslotIds({
            halls: selectedHallsData as unknown as NonNullable<GetHallsResponse>,
            onlyFullDays: false,
            onlyWeekend: false,
            reservations: (reservations ??
                []) as unknown as NonNullable<GetReservationsResponse>,
            startDateTime: startDateTimeForEnd,
            timeslots: (timeslots ??
                []) as unknown as NonNullable<GetTimeslotsResponse>,
        });
    }, [selectedHallsData, reservations, timeslots, startDateTimeForEnd]);

    // When end-day equals start-day, make sure we also include all slots that end after the selected start slot.
    const availableEndTimeslotIdSet = useMemo(() => {
        const base = new Set<string>();

        // 1) Base from service
        if (getEndDayTimeslotIds) {
            try {
                const ids = getEndDayTimeslotIds({ date: endDateVal });
                ids.forEach((id) => base.add(id));
            } catch {
                // ignore
            }
        }

        // 2) Same-day augmentation: include any slot whose end_time > selected start slot's start time
        if (startTimeslotIdVal && isSameDay(endDateVal, startDateVal)) {
            const startSlot = timeslotById.get(startTimeslotIdVal);
            const startTime = startSlot?.start;
            if (startTime) {
                (timeslots ?? []).forEach((t: unknown, idx) => {
                    const id = getStringProp(t, "id") ?? String(idx);
                    const end = getStringProp(t, "end_time") ?? "";
                    if (!id || !end) return;
                    if (end.localeCompare(startTime) > 0) base.add(id);
                });
            }
        }

        return base.size ? base : null;
    }, [
        getEndDayTimeslotIds,
        endDateVal,
        startDateVal,
        startTimeslotIdVal,
        timeslotById,
        timeslots,
    ]);

    // If selected end timeslot becomes unavailable for the chosen end date,
    // reset it to the earliest by end_time for that date, or clear it.
    useEffect(() => {
        if (!availableEndTimeslotIdSet) return;
        const current = form.getValues("endTimeslotId");
        if (current && availableEndTimeslotIdSet.has(current)) return;

        const firstAvailable = (timeslots ?? [])
            .map((t: unknown, idx) => ({
                end: getStringProp(t, "end_time") ?? "",
                id: getStringProp(t, "id") ?? String(idx),
            }))
            .filter(
                (x): x is { end: string; id: string } =>
                    Boolean(x.id) && availableEndTimeslotIdSet.has(x.id)
            )
            .sort((a, b) => a.end.localeCompare(b.end))[0]?.id;

        if (firstAvailable) {
            form.setValue("endTimeslotId", firstAvailable, {
                shouldDirty: true,
                shouldValidate: true,
            });
        } else if (current) {
            form.setValue("endTimeslotId", undefined as unknown as string, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    }, [endDateVal, availableEndTimeslotIdSet, timeslots, form]);

    // Build day-timeslot resolver and derive available start timeslot IDs for the selected date
    const getDayTimeslotIds = useMemo(
        () =>
            createGetDayTimeslotIds({
                halls: selectedHallsData as unknown as NonNullable<GetHallsResponse>,
                onlyWeekend: isParty,
                reservations: (reservations ??
                    []) as unknown as NonNullable<GetReservationsResponse>,
                timeslots: (timeslots ??
                    []) as unknown as NonNullable<GetTimeslotsResponse>,
            }),
        [selectedHallsData, reservations, timeslots, isParty]
    );
    const availableStartTimeslotIdSet = useMemo(() => {
        try {
            const ids = getDayTimeslotIds({ date: startDateVal });
            return new Set(ids);
        } catch {
            return null;
        }
    }, [getDayTimeslotIds, startDateVal]);

    // If the selected start timeslot becomes unavailable for the chosen date,
    // reset it to the first available option for that date (by start_time ASC)
    useEffect(() => {
        if (!availableStartTimeslotIdSet) return;
        const current = form.getValues("startTimeslotId");
        if (current && availableStartTimeslotIdSet.has(current)) return;

        const firstAvailable = (timeslots ?? [])
            .map((t: unknown, idx) => ({
                id: getStringProp(t, "id") ?? String(idx),
                start: getStringProp(t, "start_time") ?? "",
            }))
            .filter(
                (x): x is { id: string; start: string } =>
                    Boolean(x.id) && availableStartTimeslotIdSet.has(x.id)
            )
            .sort((a, b) => a.start.localeCompare(b.start))[0]?.id;

        if (firstAvailable) {
            form.setValue("startTimeslotId", firstAvailable, {
                shouldDirty: true,
                shouldValidate: true,
            });
        } else if (current) {
            // Clear if no available options remain
            form.setValue("startTimeslotId", undefined as unknown as string, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    }, [startDateVal, availableStartTimeslotIdSet, timeslots, form]);

    // Compute visible steps based on current form state (skip halls only for weekendfeest)
    const visibleSteps = useMemo(
        () => steps.filter((s) => !(isParty && s.key === "halls")),
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

    // Keep endDate in sync with startDate for weekendfeest
    useEffect(() => {
        if (isParty && form.getValues("endDate") !== startDateVal)
            form.setValue("endDate", startDateVal, { shouldValidate: true });
    }, [isParty, startDateVal, form]);

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
                // endDate is mirrored by effect
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
                        // Use the memoized lookup to avoid unsafe property access
                        const sSlot = sId ? timeslotById.get(sId) : undefined;
                        const eSlot = eId ? timeslotById.get(eId) : undefined;
                        if (sSlot && eSlot) {
                            const sDT = combineDateAndTime(sDate, sSlot.start);
                            const eDT = combineDateAndTime(eDate, eSlot.end);
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
        timeslotById,
        combineDateAndTime,
    ]);

    const goPrev = useCallback(() => {
        setActiveStep((s) => Math.max(0, s - 1));
    }, []);

    // Submit on final confirm
    const onSubmitFinal = useCallback(
        async (values: output<typeof schema>) => {
            try {
                await onSubmitValid(values);
                setActiveStep(visibleSteps.length - 1);
            } catch {
                // Keep the user on the confirm step if submission fails
            }
        },
        [onSubmitValid, visibleSteps.length]
    );

    const isLastEditableStep =
        activeStep === visibleSteps.findIndex((s) => s.key === "confirm");

    return (
        <>
            <div className="container mx-auto max-w-3xl py-4">
                <h2 className="mb-2 text-xl font-semibold">
                    Reservatie aanvragen
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                    Gelieve de onderstaande stappen te doorlopen om een
                    reservatie aan te vragen.
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
                        onSubmit={(e) =>
                            void form.handleSubmit(onSubmitFinal)(e)
                        }
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
                                                Indien ja, worden alle zalen
                                                voor de volledige geselecteerde
                                                dag gereserveerd.
                                            </FormDescription>
                                            <FormControl>
                                                <RadioGroup
                                                    className="flex gap-6"
                                                    onValueChange={(v) => {
                                                        field.onChange(
                                                            v === "yes"
                                                        );
                                                    }}
                                                    value={
                                                        field.value
                                                            ? "yes"
                                                            : "no"
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
                                            <FormLabel>
                                                Wie reserveert?
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    className="flex gap-6"
                                                    onValueChange={
                                                        field.onChange
                                                    }
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
                                                <FormLabel>
                                                    Organisatie
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
                                                                        String(
                                                                            idx
                                                                        );
                                                                    const name =
                                                                        getStringProp(
                                                                            o,
                                                                            "name"
                                                                        ) ?? id;
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
                                                                                name
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
                                )}
                            </div>
                        )}

                        {/* Step 3: Halls (skip if party) */}
                        {activeKey === "halls" && (
                            <div className="space-y-2">
                                {halls?.map((h: unknown) => (
                                    <FormField
                                        control={form.control}
                                        key={getStringProp(h, "id") ?? "hall"}
                                        name="selectedHallIds"
                                        render={({ field }) => {
                                            const id =
                                                getStringProp(h, "id") ?? "";
                                            const checked =
                                                field.value.includes(id);
                                            return (
                                                <label className="flex cursor-pointer items-center gap-3 rounded border p-3">
                                                    <Checkbox
                                                        checked={checked}
                                                        onCheckedChange={(
                                                            v
                                                        ) => {
                                                            const on =
                                                                Boolean(v);
                                                            if (on) {
                                                                // Add hall ID
                                                                form.setValue(
                                                                    "selectedHallIds",
                                                                    [
                                                                        ...field.value,
                                                                        id,
                                                                    ],
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldValidate: true,
                                                                    }
                                                                );
                                                            } else {
                                                                // Remove hall ID
                                                                form.setValue(
                                                                    "selectedHallIds",
                                                                    field.value.filter(
                                                                        (
                                                                            val: string
                                                                        ) =>
                                                                            val !==
                                                                            id
                                                                    ),
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldValidate: true,
                                                                    }
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
                                                        defaultMonth={
                                                            startDateVal
                                                        }
                                                        disabled={
                                                            isStartDateDisabled
                                                        }
                                                        locale={nlBE}
                                                        mode="single"
                                                        modifiers={
                                                            startModifiers
                                                        }
                                                        modifiersClassNames={
                                                            modifiersClassNames
                                                        }
                                                        month={startMonth}
                                                        onMonthChange={
                                                            setStartMonth
                                                        }
                                                        onSelect={(d) => {
                                                            field.onChange(
                                                                d ?? undefined
                                                            );
                                                        }}
                                                        selected={field.value}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Alle zalen worden voor de
                                                    hele dag geboekt op de
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
                                                            defaultMonth={
                                                                startDateVal
                                                            }
                                                            disabled={
                                                                isStartDateDisabled
                                                            }
                                                            locale={nlBE}
                                                            mode="single"
                                                            modifiers={
                                                                startModifiers
                                                            }
                                                            modifiersClassNames={
                                                                modifiersClassNames
                                                            }
                                                            month={startMonth}
                                                            onMonthChange={
                                                                setStartMonth
                                                            }
                                                            onSelect={(d) => {
                                                                field.onChange(
                                                                    d ??
                                                                        undefined
                                                                );
                                                            }}
                                                            selected={
                                                                field.value
                                                            }
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
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecteer starttijd" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {timeslots
                                                                    ?.filter(
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
                                                                            if (
                                                                                !id
                                                                            )
                                                                                return false;
                                                                            // If no date yet, show all; otherwise only allowed IDs
                                                                            return (
                                                                                !availableStartTimeslotIdSet ||
                                                                                availableStartTimeslotIdSet.has(
                                                                                    id
                                                                                )
                                                                            );
                                                                        }
                                                                    )
                                                                    .sort(
                                                                        (
                                                                            a,
                                                                            b
                                                                        ) =>
                                                                            a.start_time.localeCompare(
                                                                                b.start_time
                                                                            )
                                                                    )
                                                                    .map(
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
                                                                                ) ??
                                                                                "";
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

                        {/* Step 5: End (keep for party; show only calendar) */}
                        {activeKey === "end" &&
                            (isParty ? (
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Einddatum weekendfeest
                                            </FormLabel>
                                            <FormControl>
                                                <Calendar
                                                    className="rounded-lg border"
                                                    defaultMonth={startDateVal}
                                                    disabled={isEndDateDisabled}
                                                    locale={nlBE}
                                                    mode="single"
                                                    modifiers={endModifiers}
                                                    modifiersClassNames={
                                                        modifiersClassNames
                                                    }
                                                    onSelect={(d) => {
                                                        field.onChange(
                                                            d ?? undefined
                                                        );
                                                    }}
                                                    selected={field.value}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Alle zalen worden voor de hele
                                                dag geboekt op de geselecteerde
                                                datum.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : (
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
                                                        defaultMonth={
                                                            startDateVal
                                                        }
                                                        disabled={
                                                            isEndDateDisabled
                                                        }
                                                        locale={nlBE}
                                                        mode="single"
                                                        modifiers={endModifiers}
                                                        modifiersClassNames={
                                                            modifiersClassNames
                                                        }
                                                        onSelect={(d) => {
                                                            field.onChange(
                                                                d ?? undefined
                                                            );
                                                        }}
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
                                                <FormLabel>
                                                    Eindtijdslot
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecteer eindtijd" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {timeslots
                                                                ?.filter(
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
                                                                        if (!id)
                                                                            return false;
                                                                        // If no date/start context yet, show all; otherwise only allowed IDs
                                                                        return (
                                                                            !availableEndTimeslotIdSet ||
                                                                            availableEndTimeslotIdSet.has(
                                                                                id
                                                                            )
                                                                        );
                                                                    }
                                                                )
                                                                .sort((a, b) =>
                                                                    a.end_time.localeCompare(
                                                                        b.end_time
                                                                    )
                                                                )
                                                                .map(
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
                                                                        const end =
                                                                            getStringProp(
                                                                                t,
                                                                                "end_time"
                                                                            ) ??
                                                                            "";
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
                                                                                    end
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
                            ))}

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
                                    <h3 className="mb-2 font-medium">
                                        Overzicht
                                    </h3>
                                    <ul className="space-y-1">
                                        <li>
                                            Weekendfeest:{" "}
                                            {isParty ? "Ja" : "Nee"}
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
                                                            o.id ===
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
                                                            .includes(
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
                                                            getStringProp(
                                                                h,
                                                                "id"
                                                            ) ??
                                                            ""
                                                    )
                                                    .join(", ") ?? "-"}
                                            </li>
                                        )}
                                        <li>
                                            Start:{" "}
                                            {form
                                                .getValues("startDate")
                                                .toLocaleDateString() ||
                                                "-"}{" "}
                                            {getStringProp(
                                                timeslots?.find(
                                                    (t: unknown) =>
                                                        String(
                                                            getStringProp(
                                                                t,
                                                                "id"
                                                            )
                                                        ) ===
                                                        form.getValues(
                                                            "startTimeslotId"
                                                        )
                                                ),
                                                "start_time"
                                            ) ??
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
                                                .toLocaleDateString() ||
                                                (isParty
                                                    ? form
                                                          .getValues(
                                                              "startDate"
                                                          )
                                                          .toLocaleDateString()
                                                    : "-")}{" "}
                                            {getStringProp(
                                                timeslots?.find(
                                                    (t: unknown) =>
                                                        String(
                                                            getStringProp(
                                                                t,
                                                                "id"
                                                            )
                                                        ) ===
                                                        form.getValues(
                                                            "endTimeslotId"
                                                        )
                                                ),
                                                "end_time"
                                            ) ??
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
                                                    onCheckedChange={(v) => {
                                                        field.onChange(
                                                            Boolean(v)
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <span className="text-sm">
                                                    Ik heb het reglement gelezen
                                                    en ga ermee akkoord.{" "}
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
                                    Uw aanvraag werd succesvol ingediend. U
                                    ontvangt een bevestigingsmail na manuele
                                    controle.
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
                                <Button type="submit">
                                    Reservatie bevestigen
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </div>
            <DevTool control={form.control} placement="top-right" />
        </>
    );
};

export default ReservationForm;
