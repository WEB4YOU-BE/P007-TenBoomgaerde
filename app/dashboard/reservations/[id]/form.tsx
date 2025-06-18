"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    CheckCircleIcon,
    ClockUserIcon,
    SpinnerBallIcon,
    XCircleIcon,
} from "@phosphor-icons/react/ssr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import type { Tables } from "@/types/supabase/database";

import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import Form from "@/components/atoms/Form/Form";
import { Input } from "@/components/atoms/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select";
import { Textarea } from "@/components/atoms/textarea";

import { getReservationById, updateReservationById } from "./actions";

const formSchema = z.object({
    access_code: z.number(),
    gefactureerd: z.boolean().nullable(),
    remarks: z.string().nullable(),
    status: z.string().nullable(),
});
interface Props {
    id: string;
    initialData?: Tables<"reservations">;
}
const UpdateReservationForm = ({ id, initialData }: Props) => {
    const queryClient = useQueryClient();

    const { data: reservation, isPending: isPendingReservation } = useQuery({
        initialData,
        networkMode: "online",
        queryFn: () => getReservationById(id),
        queryKey: ["reservation", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        if (!reservation)
            return toast.error(
                "Er is geen reservering gevonden om bij te werken."
            );
        mutate({
            id: id,
            reservation: {
                ...formData,
                end_date: reservation.end_date,
                end_hour: reservation.end_hour,
                id: reservation.id,
                organizations_id: reservation.organizations_id,
                product_id: reservation.product_id,
                reservation_number: reservation.reservation_number,
                reservation_year: reservation.reservation_year,
                room_id: reservation.room_id,
                start_date: reservation.start_date,
                start_hour: reservation.start_hour,
                user_id: reservation.user_id,
            },
        });
    };
    const {
        isError,
        isPending: isPendingUpdate,
        mutate,
    } = useMutation({
        mutationFn: updateReservationById,
        mutationKey: ["UpdateReservation"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("De zaal is bijgewerkt!");
            void queryClient.invalidateQueries({
                queryKey: ["reservation", id],
            });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            access_code: reservation?.access_code ?? 0,
            gefactureerd: reservation?.gefactureerd ?? null,
            remarks: reservation?.remarks ?? null,
            status: reservation?.status ?? null,
        },
        disabled: isPendingReservation || isPendingUpdate,
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (reservation)
            form.reset({
                access_code: reservation.access_code ?? 0,
                gefactureerd: reservation.gefactureerd ?? null,
                remarks: reservation.remarks ?? null,
                status: reservation.status ?? null,
            });
    }, [reservation, form]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
                    <div className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={
                                                isPendingReservation ||
                                                isPendingUpdate
                                            }
                                            onValueChange={field.onChange}
                                            value={field.value || ""}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Kies een status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="goedgekeurd">
                                                    <CheckCircleIcon color="green" />{" "}
                                                    Goedgekeurd
                                                </SelectItem>
                                                <SelectItem value="in afwachting">
                                                    <ClockUserIcon color="orange" />{" "}
                                                    In afwachting
                                                </SelectItem>
                                                <SelectItem value="geweigerd">
                                                    <XCircleIcon color="red" />{" "}
                                                    Geweigerd
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gefactureerd"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={!!field.value}
                                            disabled={field.disabled}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Gefactureerd</FormLabel>
                                        <FormDescription>
                                            Deze reservering is gefactureerd.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="access_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Toegangscode</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={field.disabled}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value === ""
                                                        ? 0
                                                        : Number(e.target.value)
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
                            name="remarks"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Opmerkingen</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={field.disabled}
                                            placeholder="Voeg opmerkingen toe"
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isPendingReservation || isPendingUpdate}
                            type="submit"
                            variant={isError ? "destructive" : "default"}
                        >
                            {isPendingReservation ||
                                (isPendingUpdate && (
                                    <SpinnerBallIcon className="size-4 animate-spin" />
                                ))}
                            {!isPendingReservation &&
                                !isPendingUpdate &&
                                "Bijwerken"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default UpdateReservationForm;
