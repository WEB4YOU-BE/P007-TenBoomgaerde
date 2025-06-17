"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import type { Tables } from "@/types/supabase/database";

import Button from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/checkbox";
import Form, {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import { Input } from "@/components/atoms/input";

import { getHallById, updateHallById } from "./actions";

const formSchema = z.object({
    day_price: z.number(),
    day_price2: z.number(),
    name: z.string(),
    private: z.boolean(),
});
interface Props {
    id: string;
    initialData?: Tables<"rooms">;
}
const UpdateHallForm = ({ id, initialData }: Props) => {
    const queryClient = useQueryClient();

    const { data: hall, isPending: isPendingHall } = useQuery({
        initialData,
        networkMode: "online",
        queryFn: () => getHallById(id),
        queryKey: ["hall", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ hall: formData, id: id });
    };
    const {
        isError,
        isPending: isPendingUpdate,
        mutate,
    } = useMutation({
        mutationFn: updateHallById,
        mutationKey: ["UpdateHall"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("De zaal is bijgewerkt!");
            queryClient.invalidateQueries({ queryKey: ["hall", id] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            day_price: 0,
            day_price2: 0,
            name: "",
            private: false,
        },
        disabled: isPendingHall || isPendingUpdate,
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (hall)
            form.reset({
                day_price: hall.day_price || 0,
                day_price2: hall.day_price2 || 0,
                name: hall.name || "",
                private: hall.private || false,
            });
    }, [hall, form]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Naam</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="day_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prijs per blok</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value)
                                                )
                                            }
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="day_price2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prijs per 2 blokken</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value)
                                                )
                                            }
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="private"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            disabled={field.disabled}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Privaat</FormLabel>
                                        <FormDescription>
                                            De zaal is privaat en dus enkel
                                            toegankelijk voor leden van Ten
                                            Boomgaerde.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isPendingHall || isPendingUpdate}
                            type="submit"
                            variant={isError ? "destructive" : "default"}
                        >
                            {isPendingHall ||
                                (isPendingUpdate && (
                                    <SpinnerBall className="size-4 animate-spin" />
                                ))}
                            {!isPendingHall && !isPendingUpdate && "Bijwerken"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default UpdateHallForm;
