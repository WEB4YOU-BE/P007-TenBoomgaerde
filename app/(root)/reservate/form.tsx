"use client";

import { Button, buttonVariants } from "@/components/atoms/button";
import { Form, FormField } from "@/components/atoms/form";
import { Label } from "@/components/atoms/label";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addReservation, fetchAllHalls } from "./actions";

const formSchema = z.object({
    access_code: z.number(),
    end_date: z.string(),
    end_hour: z.string(),
    gefactureerd: z.boolean(),
    id: z.string().optional(),
    reservation_number: z.number(),
    reservation_year: z.string(),
    room_id: z.string(),
    start_date: z.string(),
    start_hour: z.string(),
    user_id: z.string(),
});
const AddReservationForm = () => {
    const { data: halls, isPending: isPendingHalls } = useQuery({
        networkMode: "online",
        queryFn: () => fetchAllHalls(),
        queryKey: ["halls"],
        retry: false,
        staleTime: 1000 * 60, // 1 minute
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ reservation: formData });
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
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const { unsubscribe } = form.watch((value) => {
            console.log(value);
        });
        return () => unsubscribe();
    }, [form.watch]);

    return (
        <>
            <Form {...form}>
                <h1 className={"text-3xl font-bold"}>Reservatie</h1>
                <div
                    className={
                        "rounded-lg bg-gray-100 shadow-sm p-2 flex flex-col gap-4"
                    }
                >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <section>
                            <fieldset>
                                <legend>Selecteer de zaal</legend>
                                <RadioGroup
                                    className={"flex flex-row flex-wrap gap-2"}
                                >
                                    {isPendingHalls && (
                                        <LoaderPinwheel className="h-4 w-4 animate-spin" />
                                    )}
                                    {!isPendingHalls &&
                                        halls?.map((hall, index) => (
                                            <FormField
                                                control={form.control}
                                                key={hall.id}
                                                name="room_id"
                                                render={({ field }) => (
                                                    <div className="flex-grow">
                                                        <RadioGroupItem
                                                            {...field}
                                                            className="hidden"
                                                            id={index.toString()}
                                                            value={hall.id}
                                                        />
                                                        <Label
                                                            className={cn(
                                                                buttonVariants({
                                                                    variant:
                                                                        "outline",
                                                                }),
                                                                field.value ===
                                                                    "checked"
                                                                    ? "border-green-400 bg-green-100 w-full"
                                                                    : "w-full"
                                                            )}
                                                            htmlFor={index.toString()}
                                                        >
                                                            {hall.name}
                                                        </Label>
                                                    </div>
                                                )}
                                            />
                                        ))}
                                </RadioGroup>
                            </fieldset>
                        </section>
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
                </div>
            </Form>
        </>
    );
};

export default AddReservationForm;
