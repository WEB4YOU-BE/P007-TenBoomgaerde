"use client";

import { Button, buttonVariants } from "@/components/atoms/button";
import { Calendar } from "@/components/atoms/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/atoms/popover";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { nlBE } from "date-fns/locale";
import { CalendarIcon, LoaderPinwheel } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addReservation, fetchAllHalls, fetchAllTimeframes } from "./actions";

const formSchema = z.object({
    end_date: z
        .date({ message: "Einddatum is verplicht" })
        .refine((value) => value > new Date(), {
            message: "Einddatum moet in de toekomst liggen",
        }),
    end_hour: z.string().uuid({ message: "Einduur is verplicht" }),
    id: z.string().optional(),
    organizations_id: z.string().uuid({ message: "Ongeldige UUID" }).optional(),
    room_id: z.string().uuid({ message: "Zaal is verplicht" }),
    start_date: z
        .date({ message: "Startdatum is verplicht" })
        .refine((value) => value > new Date(), {
            message: "Startdatum moet in de toekomst liggen",
        }),
    start_hour: z.string().uuid({ message: "Startuur is verplicht" }),
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
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            end_date: undefined,
            end_hour: "",
            id: "",
            room_id: "",
            start_date: undefined,
            start_hour: "",
        },
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const { unsubscribe } = form.watch((value) => {
            console.log(value);
        });
        return () => unsubscribe();
    }, [form, form.watch]);

    const selectedHall = form.watch("room_id");
    const selectedStartDate = form.watch("start_date");
    const selectedStartHour = form.watch("start_hour");
    const selectedEndDate = form.watch("end_date");

    const isDisabledStartDate = useMemo(() => {
        return !selectedHall;
    }, [selectedHall]);
    const isDisabledStartHour = useMemo(() => {
        return !selectedStartDate;
    }, [selectedStartDate]);
    const isDisabledEndDate = useMemo(() => {
        return !selectedStartDate || !selectedStartHour;
    }, [selectedStartDate, selectedStartHour]);
    const isDisabledEndHour = useMemo(() => {
        return !selectedStartDate || !selectedStartHour || !selectedEndDate;
    }, [selectedStartDate, selectedStartHour, selectedEndDate]);

    return (
        <>
            <Form {...form}>
                <h1 className={"text-3xl font-bold"}>Reservatie</h1>
                <form
                    className={
                        "rounded-lg bg-gray-100 shadow-sm p-4 flex flex-col gap-4"
                    }
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {isPendingHalls && (
                        <LoaderPinwheel className="h-4 w-4 animate-spin" />
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
                                            <div
                                                className="flex-grow"
                                                key={hall.id}
                                            >
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
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
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
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="start"
                                        className="w-auto p-0"
                                    >
                                        <Calendar
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
                        <LoaderPinwheel className="h-4 w-4 animate-spin" />
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
                                                className="flex-grow"
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
                                                        {`${timeframe.start_hour.split(":")[0]}:${timeframe.start_hour.split(":")[1]}`}
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
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
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
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="start"
                                        className="w-auto p-0"
                                    >
                                        <Calendar
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
                        <LoaderPinwheel className="h-4 w-4 animate-spin" />
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
                                                className="flex-grow"
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
                                                        {`${timeframe.end_hour.split(":")[0]}:${timeframe.end_hour.split(":")[1]}`}
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
                            <LoaderPinwheel className="h-4 w-4 animate-spin" />
                        )}
                        {!isPending && "Vraag aan"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default AddReservationForm;
