"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
    getTimeslotById,
    updateTimeslotById,
} from "@/app/dashboard/timeslots/[id]/actions";
import Button from "@/components/atoms/Button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import Form from "@/components/atoms/Form/Form";
import { Input } from "@/components/atoms/input";
import { Tables } from "@/types/supabase/database";

const formSchema = z.object({
    end: z.string().time(),
    name: z.string().optional(),
    start: z.string().time(),
});
interface Props {
    id: string;
    initialData?: Tables<"timeslots">;
}
const UpdateTimeslotForm = ({ id, initialData }: Props) => {
    const queryClient = useQueryClient();

    const { data: timeslot, isPending: isPendingTimeslot } = useQuery<
        Tables<"timeslots"> | undefined
    >({
        initialData,
        networkMode: "online",
        queryFn: () => getTimeslotById(id),
        queryKey: ["timeslot", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            id: id,
            timeslot: {
                end_time: formData.end,
                name: formData.name,
                start_time: formData.start,
            },
        });
    };
    const {
        isError,
        isPending: isPendingUpdate,
        mutate,
    } = useMutation({
        mutationFn: updateTimeslotById,
        mutationKey: ["updateTimeslot"],
        networkMode: "online",

        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("De tijdsblok is bijgewerkt!");
            void queryClient.invalidateQueries({
                queryKey: ["timeslot", id],
            });
        },
    });

    const form = useForm({
        defaultValues: {
            end: timeslot?.end_time ?? "",
            name: timeslot?.name ?? "",
            start: timeslot?.start_time ?? "",
        },
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (timeslot)
            form.reset({
                end: timeslot.end_time ?? "",
                name: timeslot.name ?? "",
                start: timeslot.start_time ?? "",
            });
    }, [timeslot, form]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
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
                            name="start"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Startuur</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="end"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Einduur</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isPendingTimeslot || isPendingUpdate}
                            type="submit"
                            variant={isError ? "destructive" : "default"}
                        >
                            {isPendingTimeslot ||
                                (isPendingUpdate && (
                                    <SpinnerBallIcon className="size-4 animate-spin" />
                                ))}
                            {!isPendingTimeslot &&
                                !isPendingUpdate &&
                                "Bijwerken"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default UpdateTimeslotForm;
