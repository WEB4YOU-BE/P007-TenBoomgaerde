"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarBlankIcon, SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { nlBE } from "date-fns/locale";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Alert, { AlertDescription, AlertTitle } from "@/components/atoms/Alert";
import Button from "@/components/atoms/Button";
import Calendar from "@/components/atoms/Calendar";
import Checkbox from "@/components/atoms/Checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/atoms/dialog";
import Form, {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/atoms/popover";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select";
import { Textarea } from "@/components/atoms/textarea";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

import {
    addReservation,
    fetchAllHalls,
    fetchAllOrganizations,
    // fetchAllReservations,
    fetchAllTimeframes,
} from "./actions";

const formSchema = z.object({
    acceptRegulations: z
        .boolean({ message: "Je moet akkoord gaan met het regelement" })
        .refine((value) => value === true, {
            message: "Je moet akkoord gaan met het regelement",
        }),
    end_date: z
        .date({ message: "Einddatum is verplicht" })
        .refine((value) => value > new Date(), {
            message: "Einddatum moet in de toekomst liggen",
        }),
    end_hour: z
        .string({ message: "Startuur is verplicht" })
        .uuid({ message: "Einduur is verplicht" }),
    id: z.string().optional(),
    organizations_id: z.string().uuid().nullable(),
    remarks: z.string().optional(),
    room_id: z.string().uuid({ message: "Zaal is verplicht" }),
    start_date: z
        .date({ message: "Startdatum is verplicht" })
        .refine((value) => value > new Date(), {
            message: "Startdatum moet in de toekomst liggen",
        }),
    start_hour: z
        .string({ message: "Startuur is verplicht" })
        .uuid({ message: "Startuur is verplicht" }),
});

const AddReservationForm = () => {
    const { data: halls, isPending: isPendingHalls } = useQuery({
        networkMode: "online",
        queryFn: () => fetchAllHalls(),
        queryKey: ["halls"],
        retry: false,
        staleTime: 1000 * 60, // 1 minute
    });
    const { data: timeframes, isPending: isPendingTimeframes } = useQuery({
        networkMode: "online",
        queryFn: () => fetchAllTimeframes(),
        queryKey: ["timeframes"],
        retry: false,
        staleTime: 1000 * 60, // 1 minute
    });
    const { data: organizations } = useQuery({
        networkMode: "online",
        queryFn: () => fetchAllOrganizations(),
        queryKey: ["organizations"],
        retry: false,
        staleTime: 1000 * 60, // 1 minute
    });
    // const { data: reservations, isPending: isPendingReservations } = useQuery({
    //     networkMode: "online",
    //     queryFn: () => fetchAllReservations(),
    //     queryKey: ["reservations"],
    //     retry: false,
    //     staleTime: 1000 * 60, // 1 minute
    // });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            reservation: {
                ...formData,
                access_code: 0,
                end_date: formData.end_date.toISOString(),
                gefactureerd: false,
                reservation_number: 0,
                reservation_year: "",
                start_date: formData.start_date.toISOString(),
                user_id: "",
            },
        });
    };
    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: addReservation,
        mutationKey: ["AddReservation"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("Jouw reservering is aangevraagd!");
            form.reset();
            setIsOpenDialog(false);
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            end_date: undefined,
            end_hour: "",
            id: "",
            organizations_id: null,
            remarks: "",
            room_id: "",
            start_date: undefined,
            start_hour: "",
        },
        mode: "all",
        resolver: zodResolver(formSchema),
    });

    const selectedHall = form.watch("room_id");
    const selectedStartDate = form.watch("start_date");
    const selectedStartHour = form.watch("start_hour");
    const selectedEndDate = form.watch("end_date");

    const isDisabledStartDate = useMemo(
        () => !selectedHall || isPendingHalls,
        [selectedHall, isPendingHalls]
    );
    const isDisabledStartHour = useMemo(
        () => !selectedStartDate || isDisabledStartDate,
        [selectedStartDate, isDisabledStartDate]
    );
    const isDisabledEndDate = useMemo(
        () => !selectedStartHour || isDisabledStartHour,
        [selectedStartHour, isDisabledStartHour]
    );
    const isDisabledEndHour = useMemo(
        () => !selectedEndDate || isDisabledEndDate,
        [selectedEndDate, isDisabledEndDate]
    );

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const onOpenModal = async () => {
        if (
            await form.trigger([
                "room_id",
                "start_date",
                "start_hour",
                "end_date",
                "end_hour",
            ])
        )
            setIsOpenDialog(true);
    };

    return (
        <>
            <Form {...form}>
                <h1 className={"text-3xl font-bold"}>Reservatie</h1>
                <form
                    className={
                        "rounded-lg bg-gray-100 shadow-xs p-4 flex flex-col gap-4"
                    }
                    onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
                >
                    {isPendingHalls && (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    )}
                    {!isPendingHalls && (
                        <FormField
                            control={form.control}
                            name="room_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Selecteer de zaal</FormLabel>
                                    <RadioGroup
                                        className={
                                            "flex flex-row flex-wrap gap-2"
                                        }
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        {halls?.map((hall) => (
                                            <div className="grow" key={hall.id}>
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            className="hidden"
                                                            value={hall.id}
                                                        />
                                                    </FormControl>
                                                    <FormLabel
                                                        className={cn(
                                                            buttonVariants({
                                                                variant:
                                                                    "outline",
                                                            }),
                                                            field.value ===
                                                                hall.id
                                                                ? "border-green-400 bg-green-100"
                                                                : undefined,
                                                            "w-full"
                                                        )}
                                                    >
                                                        {hall.name}
                                                    </FormLabel>
                                                </FormItem>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <hr />
                    <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Startmoment</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                disabled={isDisabledStartDate}
                                                variant={"outline"}
                                            >
                                                {field.value ? (
                                                    format(
                                                        field.value,
                                                        "PPPP",
                                                        { locale: nlBE }
                                                    )
                                                ) : (
                                                    <span>
                                                        Selecteer de startdatum
                                                    </span>
                                                )}
                                                <CalendarBlankIcon className="ml-auto size-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="start"
                                        className="w-auto p-0"
                                    >
                                        <Calendar
                                            locale={nlBE}
                                            mode="single"
                                            onSelect={field.onChange}
                                            selected={
                                                field.value
                                                    ? new Date(field.value)
                                                    : undefined
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isPendingTimeframes && (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    )}
                    {!isPendingTimeframes && (
                        <FormField
                            control={form.control}
                            disabled={isDisabledStartHour}
                            name="start_hour"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>
                                        Selecteer het startuur
                                    </FormLabel>
                                    <RadioGroup
                                        className={
                                            "flex flex-row flex-wrap gap-2"
                                        }
                                        defaultValue={field.value}
                                        disabled={isDisabledStartHour}
                                        onValueChange={field.onChange}
                                    >
                                        {timeframes?.map((timeframe) => (
                                            <div
                                                className="grow"
                                                key={timeframe.id}
                                            >
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            className="hidden"
                                                            value={timeframe.id}
                                                        />
                                                    </FormControl>
                                                    <FormLabel
                                                        className={cn(
                                                            buttonVariants({
                                                                variant:
                                                                    "outline",
                                                            }),
                                                            field.disabled
                                                                ? "opacity-50 pointer-events-none"
                                                                : undefined,
                                                            field.value ===
                                                                timeframe.id
                                                                ? "border-green-400 bg-green-100"
                                                                : undefined,
                                                            "w-full"
                                                        )}
                                                    >
                                                        {`${timeframe.start_hour.split(":")[0]}:${timeframe.start_hour.split(":")[1]}`}{" "}
                                                        ({timeframe.name})
                                                    </FormLabel>
                                                </FormItem>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <hr />
                    <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Eindmoment</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                disabled={isDisabledEndDate}
                                                variant={"outline"}
                                            >
                                                {field.value ? (
                                                    format(
                                                        field.value,
                                                        "PPPP",
                                                        { locale: nlBE }
                                                    )
                                                ) : (
                                                    <span>
                                                        Selecteer de einddatum
                                                    </span>
                                                )}
                                                <CalendarBlankIcon className="ml-auto size-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="start"
                                        className="w-auto p-0"
                                    >
                                        <Calendar
                                            locale={nlBE}
                                            mode="single"
                                            onSelect={field.onChange}
                                            selected={
                                                field.value
                                                    ? new Date(field.value)
                                                    : undefined
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isPendingTimeframes && (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    )}
                    {!isPendingTimeframes && (
                        <FormField
                            control={form.control}
                            disabled={isDisabledEndHour}
                            name="end_hour"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Selecteer het einduur</FormLabel>
                                    <RadioGroup
                                        className={
                                            "flex flex-row flex-wrap gap-2"
                                        }
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        {timeframes?.map((timeframe) => (
                                            <div
                                                className="grow"
                                                key={timeframe.id}
                                            >
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            className="hidden"
                                                            disabled={
                                                                isDisabledEndHour
                                                            }
                                                            value={timeframe.id}
                                                        />
                                                    </FormControl>
                                                    <FormLabel
                                                        className={cn(
                                                            buttonVariants({
                                                                variant:
                                                                    "outline",
                                                            }),
                                                            field.disabled
                                                                ? "opacity-50 pointer-events-none"
                                                                : undefined,
                                                            field.value ===
                                                                timeframe.id
                                                                ? "border-green-400 bg-green-100"
                                                                : undefined,
                                                            "w-full"
                                                        )}
                                                    >
                                                        {`${timeframe.end_hour.split(":")[0]}:${timeframe.end_hour.split(":")[1]}`}{" "}
                                                        ({timeframe.name})
                                                    </FormLabel>
                                                </FormItem>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <Button
                        disabled={isPending}
                        onClick={() => void onOpenModal()}
                        type="button"
                        variant="default"
                    >
                        Volgende
                    </Button>
                    <Dialog onOpenChange={setIsOpenDialog} open={isOpenDialog}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Overzicht</DialogTitle>
                                <DialogDescription>
                                    Hieronder vind je een overzicht van jouw
                                    reservering. Controleer of alles correct is.
                                </DialogDescription>
                            </DialogHeader>
                            {/* Selection for the organisation: */}
                            <FormField
                                control={form.control}
                                name="organizations_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Organisatie (optioneel)
                                        </FormLabel>
                                        <Select
                                            defaultValue={
                                                field.value ?? undefined
                                            }
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecteer jouw organisatie" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {organizations?.map(
                                                    (organization) => (
                                                        <SelectItem
                                                            key={
                                                                organization.id
                                                            }
                                                            value={
                                                                organization.id
                                                            }
                                                        >
                                                            {organization.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="remarks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Opmerkingen</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none"
                                                placeholder="Geef een korte beschrijving van jouw activiteit of stel een vraag..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Alert variant={"destructive"}>
                                <AlertTitle>
                                    Let op, je reservering is definitief na
                                    indienen.
                                </AlertTitle>
                                <AlertDescription>
                                    <p>
                                        Kijk goed bovenstaande gegevens na. Je
                                        reservatie kan hierna niet meer
                                        aangepast worden.
                                    </p>
                                    <ul className="list-inside list-disc text-sm">
                                        <li>
                                            Controleer de gekozen zaal en data
                                        </li>
                                        <li>
                                            Controleer het start- en einduur
                                        </li>
                                        <li>
                                            Controleer je opmerkingen en
                                            organisatie
                                        </li>
                                    </ul>
                                </AlertDescription>
                            </Alert>
                            <FormField
                                control={form.control}
                                name="acceptRegulations"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Ga akkoord met het regelement
                                                voor de vergaderzalen
                                            </FormLabel>
                                            <FormDescription>
                                                Je kan het{" "}
                                                <Link href="/examples/forms">
                                                    regelement vergaderzalen
                                                </Link>{" "}
                                                bekijken door erop te klikken.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="sm:flex-row">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Bewerk
                                    </Button>
                                </DialogClose>
                                <Button
                                    disabled={isPending}
                                    onClick={(e) =>
                                        void form.handleSubmit(onSubmit)(e)
                                    }
                                    type="submit"
                                    variant={
                                        isSuccess
                                            ? "outline"
                                            : isError
                                              ? "destructive"
                                              : "default"
                                    }
                                >
                                    {isPending && (
                                        <SpinnerBallIcon className="size-4 animate-spin" />
                                    )}
                                    {!isPending && "Vraag aan"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </form>
            </Form>
        </>
    );
};

export default AddReservationForm;
