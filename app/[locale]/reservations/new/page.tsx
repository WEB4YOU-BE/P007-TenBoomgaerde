"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
// ShadCN components from local atoms
import Form, {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import { Input } from "@/components/atoms/input";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select";
import { Textarea } from "@/components/atoms/textarea";

type Booker = { email: string; name: string; phone?: string };

// Types (mocked)
type Hall = { capacity?: number; id: string; name: string };

type Organisation = { id: string; name: string };

type ReservationFormData = {
    booker: Booker;
    bookerType: "organisation" | "personal";
    end: string; // ISO string or datetime-local value
    halls: string[];
    isParty: boolean;
    organisationId?: null | string;
    partyDate?: string; // only used when isParty = true (input type="date")
    policyAccepted: boolean;
    remarks?: string;
    start: string; // ISO string or datetime-local value
};

// Mocked data fetchers
const fetchHalls = async (): Promise<Hall[]> => {
    await new Promise((r) => setTimeout(r, 250));
    return [
        { capacity: 200, id: "hall-a", name: "Grote Zaal" },
        { capacity: 80, id: "hall-b", name: "Kleine Zaal" },
        { capacity: 20, id: "hall-c", name: "Vergaderzaal" },
    ];
};

const fetchOrganisations = async (): Promise<Organisation[]> => {
    await new Promise((r) => setTimeout(r, 250));
    return [
        { id: "org-1", name: "Chiro Ten Boomgaerde" },
        { id: "org-2", name: "KSA Boomgaerde" },
        { id: "org-3", name: "VZW Buurtcomité" },
    ];
};

// Mocked submission
type ReservationSubmitInput = {
    booker: Booker;
    bookerType: "organisation" | "personal";
    end: string;
    halls: string[];
    isParty: boolean;
    organisationId?: null | string;
    policyAccepted: boolean;
    remarks?: string;
    start: string;
};

const submitReservation = async (
    payload: ReservationSubmitInput
): Promise<{ id: string }> => {
    // simulate network + server validation
    await new Promise((r) => setTimeout(r, 600));
    if (!payload.policyAccepted) {
        throw new Error("Policy must be accepted");
    }
    return { id: Math.random().toString(36).slice(2) };
};

const steps = [
    { key: "isParty", title: "Weekend party" },
    { key: "bookerType", title: "Personal or organisation" },
    { key: "halls", title: "Select halls" },
    { key: "start", title: "Start" },
    { key: "end", title: "End" },
    { key: "remarks", title: "Remarks" },
    { key: "confirm", title: "Review & policy" },
    { key: "done", title: "Confirmation" },
];

export default function NewReservationPage() {
    const [activeStep, setActiveStep] = useState(0);

    // Queries
    const { data: halls = [], isLoading: hallsLoading } = useQuery({
        queryFn: fetchHalls,
        queryKey: ["halls"],
        staleTime: 5 * 60 * 1000,
    });
    const { data: organisations = [], isLoading: orgsLoading } = useQuery({
        queryFn: fetchOrganisations,
        queryKey: ["organisations"],
        staleTime: 5 * 60 * 1000,
    });

    const defaultValues = useMemo<ReservationFormData>(
        () => ({
            booker: { email: "", name: "", phone: "" },
            bookerType: "personal",
            end: "",
            halls: [],
            isParty: false,
            organisationId: null,
            partyDate: "",
            policyAccepted: false,
            remarks: "",
            start: "",
        }),
        []
    );

    const form = useForm<ReservationFormData>({
        defaultValues,
        mode: "onSubmit",
        reValidateMode: "onChange",
        shouldUnregister: false,
    });

    const mutation = useMutation({ mutationFn: submitReservation });

    const isParty = form.watch("isParty");
    const bookerType = form.watch("bookerType");

    const goNext = async () => {
        console.debug("Going to next step", activeStep, steps[activeStep]);
        // Validate per step
        let valid = true;
        const stepKey = steps[activeStep]?.key;
        if (stepKey === "isParty") {
            valid = await form.trigger(["isParty"]); // nothing required, but keeps pattern
        } else if (stepKey === "bookerType") {
            valid = await form.trigger([
                "bookerType",
                "booker.name",
                "booker.email",
            ]); // name/email required always
            if (bookerType === "organisation") {
                const ok = await form.trigger(["organisationId"]); // org required
                valid = valid && ok;
            }
        } else if (stepKey === "halls") {
            if (!isParty) {
                valid = await form.trigger(["halls"]); // at least one
            }
        } else if (stepKey === "start") {
            if (isParty) {
                valid = await form.trigger(["partyDate"]); // party requires a date
            } else {
                valid = await form.trigger(["start"]); // datetime-local
            }
        } else if (stepKey === "end") {
            if (!isParty) {
                valid = await form.trigger(["end"]); // datetime-local
                const start = form.getValues("start");
                const end = form.getValues("end");
                if (start && end && new Date(end) <= new Date(start)) {
                    form.setError("end", {
                        message: "End must be after start",
                        type: "validate",
                    });
                    valid = false;
                }
            }
        } else if (stepKey === "remarks") {
            valid = true;
        } else if (stepKey === "confirm") {
            valid = await form.trigger(["policyAccepted"]); // must accept
        }

        if (!valid) return;
        if (activeStep < steps.length - 1) setActiveStep((s) => s + 1);
    };

    const goPrev = () => setActiveStep((s) => Math.max(0, s - 1));

    const onSubmitFinal = async (values: ReservationFormData) => {
        // Normalize payload
        let start = values.start;
        let end = values.end;
        let hallsSelected = values.halls;
        if (values.isParty) {
            const date = values.partyDate;
            if (date) {
                start = new Date(`${date}T00:00:00`).toISOString();
                end = new Date(`${date}T23:59:59`).toISOString();
            }
            hallsSelected = halls.map((h) => h.id); // all halls must be booked
        }

        await mutation.mutateAsync({
            booker: values.booker,
            bookerType: values.bookerType,
            end,
            halls: hallsSelected,
            isParty: values.isParty,
            organisationId:
                values.bookerType === "organisation"
                    ? (values.organisationId ?? null)
                    : null,
            policyAccepted: values.policyAccepted,
            remarks: values.remarks?.trim() || undefined,
            start,
        });

        setActiveStep(steps.length - 1); // go to done
    };

    // Field-level rules
    const nameRules = { required: "Name is required" };
    const emailRules = {
        pattern: {
            message: "Invalid email",
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        required: "Email is required",
    };
    const orgRules =
        bookerType === "organisation"
            ? { required: "Select an organisation" }
            : {};
    const hallsRules = !isParty
        ? {
              validate: (arr: string[]) =>
                  (arr && arr.length > 0) || "Select at least one hall",
          }
        : {};
    const startRules = !isParty ? { required: "Start is required" } : {};
    const endRules = !isParty ? { required: "End is required" } : {};
    const partyDateRules = isParty ? { required: "Select a date" } : {};

    const isLastEditableStep =
        activeStep === steps.findIndex((s) => s.key === "confirm");

    React.useEffect(() => {
        console.debug(form.formState.errors);
    }, [form.formState.errors]);

    return (
        <div className="container mx-auto max-w-3xl py-8">
            <h1 className="text-2xl font-semibold mb-2">
                Request a reservation
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
                Please complete the steps below to request a reservation for our
                halls.
            </p>

            {/* Step indicator */}
            <ol className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {steps.map((s, idx) => (
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
                    {activeStep === 0 && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="isParty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Is this a weekend party?
                                        </FormLabel>
                                        <FormDescription>
                                            If yes, all halls will be booked for
                                            the entire selected day.
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
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        id="no"
                                                        value="no"
                                                    />
                                                    <label htmlFor="no">
                                                        No
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        id="yes"
                                                        value="yes"
                                                    />
                                                    <label htmlFor="yes">
                                                        Yes
                                                    </label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {/* Step 2: Personal or organisation + booker details */}
                    {activeStep === 1 && (
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="bookerType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Who is booking?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                className="flex gap-6"
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        id="personal"
                                                        value="personal"
                                                    />
                                                    <label htmlFor="personal">
                                                        Personal
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        id="organisation"
                                                        value="organisation"
                                                    />
                                                    <label htmlFor="organisation">
                                                        Organisation
                                                    </label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {bookerType === "organisation" && (
                                <FormField
                                    control={form.control}
                                    name="organisationId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Organisation</FormLabel>
                                            <FormControl>
                                                <Select
                                                    disabled={orgsLoading}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value ?? ""}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={
                                                                orgsLoading
                                                                    ? "Loading..."
                                                                    : "Select organisation"
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {organisations.map(
                                                            (o) => (
                                                                <SelectItem
                                                                    key={o.id}
                                                                    value={o.id}
                                                                >
                                                                    {o.name}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    rules={orgRules}
                                />
                            )}

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="booker.name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    rules={nameRules}
                                />
                                <FormField
                                    control={form.control}
                                    name="booker.email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john@example.com"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    rules={emailRules}
                                />
                                <FormField
                                    control={form.control}
                                    name="booker.phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Contact phone (optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="+32 4xx xx xx xx"
                                                    type="tel"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Halls (skip if party) */}
                    {activeStep === 2 && !isParty && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="halls"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Select halls</FormLabel>
                                        <FormDescription>
                                            Choose one or more halls to reserve.
                                        </FormDescription>
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {hallsLoading && (
                                                <div>Loading halls…</div>
                                            )}
                                            {!hallsLoading &&
                                                halls.map((h) => (
                                                    <FormField
                                                        control={form.control}
                                                        key={h.id}
                                                        name="halls"
                                                        render={({ field }) => {
                                                            const selected: string[] =
                                                                field.value ||
                                                                [];
                                                            const checked =
                                                                selected.includes(
                                                                    h.id
                                                                );
                                                            return (
                                                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={
                                                                                checked
                                                                            }
                                                                            onCheckedChange={(
                                                                                v
                                                                            ) => {
                                                                                const isChecked =
                                                                                    Boolean(
                                                                                        v
                                                                                    );
                                                                                if (
                                                                                    isChecked
                                                                                )
                                                                                    field.onChange(
                                                                                        [
                                                                                            ...selected,
                                                                                            h.id,
                                                                                        ]
                                                                                    );
                                                                                else
                                                                                    field.onChange(
                                                                                        selected.filter(
                                                                                            (
                                                                                                x
                                                                                            ) =>
                                                                                                x !==
                                                                                                h.id
                                                                                        )
                                                                                    );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {h.name}
                                                                        {h.capacity ? (
                                                                            <span className="ml-2 text-xs text-muted-foreground">
                                                                                (
                                                                                {
                                                                                    h.capacity
                                                                                }{" "}
                                                                                ppl)
                                                                            </span>
                                                                        ) : null}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                rules={hallsRules}
                            />
                        </div>
                    )}

                    {/* Step 4: Start moment (party = date only) */}
                    {activeStep === 3 && (
                        <div className="space-y-4">
                            {isParty ? (
                                <FormField
                                    control={form.control}
                                    name="partyDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Party date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                All halls will be booked from
                                                00:00 to 23:59 of the selected
                                                date.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    rules={partyDateRules}
                                />
                            ) : (
                                <FormField
                                    control={form.control}
                                    name="start"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="datetime-local"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    rules={startRules}
                                />
                            )}
                        </div>
                    )}

                    {/* Step 5: End moment (skip for party) */}
                    {activeStep === 4 && !isParty && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="end"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                rules={endRules}
                            />
                        </div>
                    )}

                    {/* Step 6: Remarks */}
                    {activeStep === 5 && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="remarks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Remarks (optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Any additional information…"
                                                rows={4}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {/* Step 7: Confirm + policy */}
                    {activeStep === 6 && (
                        <div className="space-y-6">
                            <div className="rounded-md border p-4 text-sm">
                                <h3 className="mb-2 font-medium">Review</h3>
                                <ul className="space-y-1">
                                    <li>
                                        <span className="text-muted-foreground">
                                            Weekend party:
                                        </span>{" "}
                                        {isParty ? "Yes" : "No"}
                                    </li>
                                    <li>
                                        <span className="text-muted-foreground">
                                            Booker type:
                                        </span>{" "}
                                        {bookerType}
                                    </li>
                                    {bookerType === "organisation" && (
                                        <li>
                                            <span className="text-muted-foreground">
                                                Organisation:
                                            </span>{" "}
                                            {organisations.find(
                                                (o) =>
                                                    o.id ===
                                                    form.getValues(
                                                        "organisationId"
                                                    )
                                            )?.name || "—"}
                                        </li>
                                    )}
                                    <li>
                                        <span className="text-muted-foreground">
                                            Contact:
                                        </span>{" "}
                                        {form.getValues("booker.name")} (
                                        {form.getValues("booker.email")})
                                    </li>
                                    <li>
                                        <span className="text-muted-foreground">
                                            Halls:
                                        </span>{" "}
                                        {isParty
                                            ? "All halls"
                                            : halls
                                                  .filter((h) =>
                                                      form
                                                          .getValues("halls")
                                                          .includes(h.id)
                                                  )
                                                  .map((h) => h.name)
                                                  .join(", ") || "—"}
                                    </li>
                                    <li>
                                        <span className="text-muted-foreground">
                                            When:
                                        </span>{" "}
                                        {isParty
                                            ? `${form.getValues("partyDate")} (full day)`
                                            : `${form.getValues("start") || "—"} → ${form.getValues("end") || "—"}`}
                                    </li>
                                    {form.getValues("remarks") && (
                                        <li>
                                            <span className="text-muted-foreground">
                                                Remarks:
                                            </span>{" "}
                                            {form.getValues("remarks")}
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <FormField
                                control={form.control}
                                name="policyAccepted"
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
                                            <FormLabel>
                                                I accept the reservation policy
                                                and house rules
                                            </FormLabel>
                                            <FormDescription>
                                                By submitting, you agree to our
                                                terms, cancellation policy, and
                                                privacy policy.
                                            </FormDescription>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                                rules={{
                                    required: "You must accept the policy",
                                }}
                            />
                        </div>
                    )}

                    {/* Step 8: Done */}
                    {activeStep === 7 && (
                        <div className="space-y-4">
                            {mutation.isSuccess ? (
                                <div className="rounded-md border p-6">
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Reservation request received
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Your request has been submitted
                                        successfully. Reference:{" "}
                                        <span className="font-mono">
                                            {mutation.data?.id}
                                        </span>
                                        . You will receive a confirmation email
                                        after manual review.
                                    </p>
                                </div>
                            ) : mutation.isError ? (
                                <div className="rounded-md border border-destructive p-6 text-destructive">
                                    An error occurred: {mutation.error?.message}
                                </div>
                            ) : (
                                <div className="rounded-md border p-6">
                                    Submitting…
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-8 flex items-center justify-between">
                        <Button
                            disabled={
                                activeStep === 0 ||
                                activeStep === steps.length - 1
                            }
                            onClick={goPrev}
                            type="button"
                            variant="outline"
                        >
                            Back
                        </Button>

                        {activeStep < steps.length - 1 &&
                            !isLastEditableStep && (
                                <Button
                                    onClick={() => void goNext()}
                                    type="button"
                                >
                                    Next
                                </Button>
                            )}

                        {isLastEditableStep && (
                            <Button disabled={mutation.isPending} type="submit">
                                {mutation.isPending
                                    ? "Submitting…"
                                    : "Confirm reservation"}
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}
